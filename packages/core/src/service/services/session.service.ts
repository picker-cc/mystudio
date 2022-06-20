import {EntityManager} from '@mikro-orm/mongodb';
import {Injectable} from '@nestjs/common';
import crypto from 'crypto';
import ms from 'ms';

import {ConfigService} from '../../config';
import {EventBus, LoginEvent} from '../../event-bus';
import {PasswordCipher} from "../helpers/password-cipher/password-cipher";
import {RequestContext} from "../../api";
import {Session, User} from "../../entity";
import {CachedSession, SessionCacheStrategy} from '../../config/session-cache/session-cache-strategy';
import {SessionType} from "@picker-cc/common/lib/generated-types";
import {getUserPermissions} from "../helpers/get-user-permissions";

@Injectable()
export class SessionService {
    private sessionCacheStrategy: SessionCacheStrategy;
    private readonly sessionDurationInMs: number;

    constructor(
        private readonly em: EntityManager,
        private passwordCipher: PasswordCipher,
        private configService: ConfigService,
        private eventBus: EventBus,
    ) {
        this.sessionCacheStrategy = this.configService.authOptions.sessionCacheStrategy;
        this.sessionDurationInMs = ms(this.configService.authOptions.sessionDuration as string);
    }

    /**
     * @description
     * 根据 token 返回 session
     */
    async getSessionFromToken(sessionToken: string): Promise<CachedSession | undefined> {
        let serializedSession = await this.sessionCacheStrategy.get(sessionToken)
        const stale = !!(serializedSession && serializedSession.cacheExpiry < new Date().getTime() / 1000);
        const expired = !!(serializedSession && serializedSession.expires < new Date());
        if (!serializedSession || stale || expired) {
            const session = await this.findSessionByToken(sessionToken);
            if (session) {
                serializedSession = this.serializeSession(session)
                await this.sessionCacheStrategy.set(serializedSession)
                return serializedSession
            } else {
                return
            }
        }
    }

    /**
     * 如果超过了当前会话的过期日期的一半，那么我们就更新它。
     * 这确保了会话在活动使用时不会过期，但防止我们需要对每个请求运行一个更新查询。
     * @param session
     * @private
     */
    private async updateSessionExpiry(session: Session) {
        const now = new Date().getTime();
        if (session.expires.getTime() - now < this.sessionDurationInMs / 2) {
            const findSession = await this.em.findOne(Session, {id: session.id});
            if (findSession !== null) {
                findSession.expires = this.getExpiryDate(this.sessionDurationInMs);
                await this.em.persistAndFlush(findSession);
            }
        }
    }

    /**
     * @description
     * 创建一个新的 {@link AuthenticatedSession}，认证成功后使用。
     */
    async createNewAuthenticatedSession(
        ctx: RequestContext,
        user: User,
        authenticationStrategyName: string,
    ): Promise<Session> {
        const token = await this.generateSessionToken();

        const authenticatedSession = new Session({
            token,
            user,
            authenticationStrategy: authenticationStrategyName,
            expires: this.getExpiryDate(this.sessionDurationInMs),
            invalidated: false,
            type: SessionType.AUTHENTICATED,
        })
        await this.em.persistAndFlush(authenticatedSession)
        return authenticatedSession
    }

    /**
     * @description
     * 创建一个{@link AnonymousSession}，并使用配置的{@link SessionCacheStrategy}缓存它，
     * 并返回缓存的会话对象。
     */
    async createAnonymousSession(): Promise<CachedSession> {
        const token = await this.generateSessionToken();
        const newSession = new Session({
            token,
            expires: this.getExpiryDate(this.sessionDurationInMs),
            invalidated: false,
            type: SessionType.ANONYMOUS,
        })
        // 保存新 session
        await this.em.persistAndFlush(newSession);
        const serializedSession = this.serializeSession(newSession);
        await this.sessionCacheStrategy.set(serializedSession);
        return serializedSession;
    }

    /**
     * 根据未来的 timeToExpireInMs 返回未来的过期日期
     * @param timeToExpireInMs
     * @private
     */
    private getExpiryDate(timeToExpireInMs: number): Date {
        return new Date(Date.now() + timeToExpireInMs);
    }

    /**
     * 生成一个随机 session token
     * @private
     */
    private generateSessionToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buf) => {
                if (err) {
                    reject(err);
                }
                resolve(buf.toString('hex'));
            });
        });
    }

    /**
     * @description
     * 将{@link Session}实例序列化为适合缓存的简化对象。
     * @param session
     */
    serializeSession(session: Session): CachedSession {
        const expiry =
            Math.floor(new Date().getTime() / 1000) + this.configService.authOptions.sessionCacheTTL;
        const serializedSession: CachedSession = {
            cacheExpiry: expiry,
            id: session.id,
            token: session.token,
            expires: session.expires,
        };
        if (this.isAuthenticatedSession(session)) {
            serializedSession.authenticationStrategy = session.authenticationStrategy;
            const {user} = session;
            serializedSession.user = {
                id: user.id,
                identifier: user.identifier,
                verified: user.verified,
                permissions: user.roles ? getUserPermissions(user) : []
                // channelPermissions: getUserChannelsPermissions(user),
            };
        }
        return serializedSession;
    }

    private isAuthenticatedSession(session: Session): session is Session {
        return session.hasOwnProperty('user');
    }

    /**
     * 使用给定的令牌查找有效的会话，如果找到则返回。
     * @param token
     * @private
     */
    private async findSessionByToken(token: string): Promise<Session | undefined> {
        const session = await this.em.findOne(Session, {token});
        if (session && session.expires > new Date()) {
            await this.updateSessionExpiry(session)
            return session
        }
    }

    /**
     * @description
     * 删除给定用户的所有现有会话。
     */
    async deleteSessionsByUser(ctx: RequestContext, user: User): Promise<void> {
        const userSessions = await this.em.find(Session, {user});
        await this.em.remove(userSessions);
        for (const session of userSessions) {
            await this.sessionCacheStrategy.delete(session.token);
        }
    }
}
