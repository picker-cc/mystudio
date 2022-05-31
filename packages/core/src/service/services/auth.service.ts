import {EntityManager} from "@mikro-orm/mongodb";
import {AuthenticationStrategy, ConfigService} from "../../config";
import {UserService} from "./user.service";
import {ListQueryBuilder, parseFilterParams} from "../helpers/list-query-builder/list-query-builder";
import {Administrator, Session, User} from "../../entity";
import {EntityNotFoundError, InternalServerError, ListQueryOptions} from "../../common";
import {ApiType, RequestContext} from "../../api";
import {Injectable} from "@nestjs/common";
import {EventBus, LoginEvent} from "../../event-bus";
import {NATIVE_AUTH_STRATEGY_NAME, NativeAuthenticationData, NativeAuthenticationStrategy} from "../../config/auth/native-authentication-strategy";
import {AttemptedLoginEvent} from "../../event-bus/events/AttemptedLoginEvent";
import { InvalidCredentialsError, NotVerifiedError } from "../../common/error/generated-graphql-admin-errors";
import {AuthenticatedSession} from "../../entity/session/authenticated-session.entity";
import { SessionService } from "./session.service";

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
           return new InvalidCredentialsError('') ;
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

    private getAuthenticationStrategy(
        apiType: ApiType,
        method: typeof NATIVE_AUTH_STRATEGY_NAME,
    ): NativeAuthenticationStrategy;
    private getAuthenticationStrategy(apiType: ApiType, method: string): AuthenticationStrategy;
    private getAuthenticationStrategy(apiType: ApiType, method: string): AuthenticationStrategy {
        const { authOptions } = this.configService;
        const strategies =
            apiType === 'admin'
                ? authOptions.adminAuthenticationStrategy
                : authOptions.studioAuthenticationStrategy;
        const match = strategies.find(s => s.name === method);
        if (!match) {
            throw new InternalServerError('error.unrecognized-authentication-strategy', { name: method });
        }
        return match;
    }
}
