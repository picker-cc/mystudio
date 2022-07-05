import {EntityManager} from "@mikro-orm/mongodb";
import {AuthenticationStrategy, ConfigService} from "../../config";
import {UserService} from "./user.service";
import {ListQueryBuilder, parseFilterParams} from "../helpers/list-query-builder/list-query-builder";
import {Administrator, Session, User} from "../../entity";
import {EntityNotFoundError, InternalServerError, ListQueryOptions} from "../../common";
import {ApiType, RequestContext} from "../../api";
import {Injectable} from "@nestjs/common";
import {EventBus, LoginEvent} from "../../event-bus";
import {
    NATIVE_AUTH_STRATEGY_NAME,
    NativeAuthenticationData,
    NativeAuthenticationStrategy
} from "../../config/auth/native-authentication-strategy";
import {InvalidCredentialsError, NotVerifiedError} from "../../common/error/generated-graphql-admin-errors";
import {AuthenticatedSession} from "../../entity/session/authenticated-session.entity";
import {SessionService} from "./session.service";
import {LogoutEvent} from "../../event-bus/events/logout-event";
import {AttemptedLoginEvent} from "../../event-bus/events/attempted-login-event";

@Injectable()
export class AuthService {
    constructor(
        private readonly em: EntityManager,
        private configService: ConfigService,
        private listQueryBuilder: ListQueryBuilder,
        private userService: UserService,
        private sessionService: SessionService,
        private eventBus: EventBus,
    ) {
    }

    /**
     * 验证用户的凭据，如果通过则创建一个新的 {@link AuthenticationSession}
     */
    async authenticate(
        ctx: RequestContext,
        apiType: ApiType,
        authenticationMethod: string,
        authenticationData: any,
    ): Promise<Session | InvalidCredentialsError | NotVerifiedError> {
        this.eventBus.publish(
            new AttemptedLoginEvent(
                ctx,
                authenticationMethod,
                authenticationMethod === NATIVE_AUTH_STRATEGY_NAME
                    ? (authenticationData as NativeAuthenticationData).username
                    : undefined,
            )
        )
        const authenticationStrategy = this.getAuthenticationStrategy(apiType, authenticationMethod);
        const authenticateResult = await authenticationStrategy.authenticate(ctx, authenticationData);
        if (typeof authenticateResult === 'string') {
            return new InvalidCredentialsError(authenticateResult);
        }
        if (!authenticateResult) {
            return new InvalidCredentialsError('');
        }
        return this.createAuthenticatedSessionForUser(ctx, authenticateResult, authenticationStrategy.name)
    }

    async createAuthenticatedSessionForUser(
        ctx: RequestContext,
        user: User,
        authenticationStrategyName: string,
    ): Promise<AuthenticatedSession | NotVerifiedError> {
        // 如果用户必需要通过验证，且用户未验证
        if (this.configService.authOptions.requireVerification && !user.verified) {
            return new NotVerifiedError();
        }
        user.lastLogin = new Date()
        await this.em.persistAndFlush(user)
        const session = await this.sessionService.createNewAuthenticatedSession(
            ctx,
            user,
            authenticationStrategyName
        )
        this.eventBus.publish(new LoginEvent(ctx, user))
        return session
    }

    /**
     * @description
     * 删除与给定会话令牌关联的用户的所有会话。
     */
    async destroyAuthenticatedSession(ctx: RequestContext, sessionToken: string): Promise<void> {
        // const session = await this.connection.getRepository(ctx, AuthenticatedSession).findOne({
        //     where: { token: sessionToken },
        //     relations: ['user', 'user.authenticationMethods'],
        // });
        const session = await this.em.findOne(Session, {token: sessionToken})
        console.log('找到 session')
        console.log(session)
        if (session) {
            const authenticationStrategy = this.getAuthenticationStrategy(
                ctx.apiType,
                session.authenticationStrategy,
            );
            console.log(authenticationStrategy)
            if (typeof authenticationStrategy.onLogOut === 'function') {
                await authenticationStrategy.onLogOut(ctx, session.user);
            }
            this.eventBus.publish(new LogoutEvent(ctx));
            return this.sessionService.deleteSessionsByUser(ctx, session.user);
        }
    }

    private getAuthenticationStrategy(
        apiType: ApiType,
        method: typeof NATIVE_AUTH_STRATEGY_NAME,
    ): NativeAuthenticationStrategy;
    private getAuthenticationStrategy(apiType: ApiType, method: string): AuthenticationStrategy;
    private getAuthenticationStrategy(apiType: ApiType, method: string): AuthenticationStrategy {
        const {authOptions} = this.configService;
        const strategies =
            apiType === 'admin'
                ? authOptions.adminAuthenticationStrategy
                : authOptions.studioAuthenticationStrategy;
        const match = strategies.find(s => s.name === method);
        if (!match) {
            throw new InternalServerError('error.unrecognized-authentication-strategy', {name: method});
        }
        return match;
    }
}
