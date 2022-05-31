import {DeepPartial} from '@picker-cc/common/lib/shared-types';
import {Entity, Index, ManyToOne, Property} from '@mikro-orm/core';

import {PickerMongoEntity} from '../base/mongo-base.entity';
import {User} from '../user/user.entity';
import {SessionType} from "@picker-cc/common/lib/generated-types";

/**
 * @description
 * 当用户对受限的 API 操作发出请求时，会话被创建。
 * 在未认证用户的情况下，Session可以是 {@link AnonymousSession} 否则它是 {@link AuthenticatedSession}
 * @docCategory entities
 */
@Entity()
export class Session extends PickerMongoEntity {
    constructor(input: DeepPartial<Session>) {
        super(input);
    }

    @Index()
    @Property()
    token: string;

    @Index()
    @Property()
    expires: Date;

    @Property()
    invalidated: boolean;

    @Index()
    @Property()
    identifier: string;

    @ManyToOne(() => User)
    user: User;

    // Authenticated | Anonymous
    @Property()
    type: SessionType;

    @Property()
    authenticationStrategy: string;
}
