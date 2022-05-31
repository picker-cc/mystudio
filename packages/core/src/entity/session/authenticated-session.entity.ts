import {Entity, ManyToOne, Property} from '@mikro-orm/core';
import {Session} from "./session.entity";
import {DeepPartial} from "@picker-cc/common/lib/shared-types";
import {User} from "../user/user.entity";

/**
 * @description
 * 认证成功后将创建 AuthenticatedSession
 *
 * @docsCategory entities
 */

@Entity()
export class AuthenticatedSession extends Session {
    constructor(input: DeepPartial<AuthenticatedSession>) {
        super(input);
    }

    /**
     * @description
     * 已通过身份验证来创建此会话的 {@link User}
     */
    @ManyToOne(type => User)
    user: User;

    /**
     * @description
     * 创建此会话时使用的 {@link AuthenticationStrategy} 名称
     */
    @Property()
    authenticationStrategy: string;
}
