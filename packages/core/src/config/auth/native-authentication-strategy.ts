import { ID } from '@picker-cc/common/lib/shared-types';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { RequestContext } from '../../api/common/request-context';
import { Injector } from '../../common/injector';
import { User } from '../../entity/user/user.entity';

import { AuthenticationStrategy } from './authentication-strategy';
// import {NativeAuthenticationMethod} from "../../entity";
import {EntityManager, Loaded} from "@mikro-orm/core";

export interface NativeAuthenticationData {
    username: string;
    password: string;
}

export const NATIVE_AUTH_STRATEGY_NAME = 'native';

/**
 * @description
 * 该策略实现了基于用户名/密码凭据认证，凭据存储在 Picker 数据库。
 * 这是默认的身份验证方法，建议保持配置，除非有特定的原因。
 *
 * @docsCategory auth
 */
export class NativeAuthenticationStrategy implements AuthenticationStrategy<NativeAuthenticationData> {
    readonly name = NATIVE_AUTH_STRATEGY_NAME;

    // private connection: TransactionalConnection;
    private connection: EntityManager;
    private passwordCipher: import('../../service/helpers/password-cipher/password-cipher').PasswordCipher;

    async init(injector: Injector) {
        // this.connection = injector.get(TransactionalConnection);
        // This is lazily-loaded to avoid a circular dependency
        const { PasswordCipher } = await import('../../service/helpers/password-cipher/password-cipher');
        this.passwordCipher = injector.get(PasswordCipher);
    }

    defineInputType(): DocumentNode {
        return gql`
            input NativeAuthInput {
                username: String!
                password: String!
            }
        `;
    }

    async authenticate(ctx: RequestContext, data: NativeAuthenticationData): Promise<User | false> {
        const user = await this.getUserFromIdentifier(ctx, data.username);
        if (!user) {
            return false;
        }
        const passwordMatch = await this.verifyUserPassword(ctx, user.id, data.password);
        if (!passwordMatch) {
            return false;
        }
        return user;
    }

    private getUserFromIdentifier(ctx: RequestContext, identifier: string): Promise<User | undefined>{
        return this.connection.findOne(User, {identifier: identifier})
    }

    /**
     * Verify the provided password against the one we have for the given user.
     */
    async verifyUserPassword(ctx: RequestContext, userId: ID, password: string): Promise<boolean> {
        const user = await this.connection.findOne(User, {id: userId})
        // const user = await this.connection.getRepository(ctx, User).findOne(userId, {
        //     relations: ['authenticationMethods'],
        // });
        if (!user) {
            return false;
        }
        // const nativeAuthMethod = user.getNativeAuthenticationMethod();
        // const nativeAuthMethod = user.getNativeAuthenticationMethod()
        // const pw =
        //     (
        //         await this.connection
        //             .getRepository(ctx, NativeAuthenticationMethod)
        //             .findOne(nativeAuthMethod.id, {
        //                 select: ['passwordHash'],
        //             })
        //     )?.passwordHash ?? '';
        //
        // const pw = await this.connection.findOne(User, {id: userId}, {fields: ['nativeAuthMethod.']});
        // const passwordMatches = await this.passwordCipher.check(password, nativeAuthMethod.passwordHash);
        // if (!passwordMatches) {
        //     return false;
        // }
        return true;
    }
}
