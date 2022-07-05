import {DeepPartial, ID} from '@picker-cc/common/lib/shared-types';
import {Entity, EventArgs, Index, ManyToOne, Property} from '@mikro-orm/core';

import {PickerMongoEntity} from '../base/mongo-base.entity';
import {User} from '../user/user.entity';
import {SessionType} from "@picker-cc/common/lib/generated-types";
import { Order } from '../order/order.entity';

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

    // @EntityId({ nullable: true })
    @Property({ nullable: true})
    activeOrderId?: ID;

    @ManyToOne(() => Order, { nullable: true})
    activeOrder: Order | null;

    @ManyToOne(() => User, {eager: true})
    user: User;

    // Authenticated | Anonymous
    @Property()
    type: SessionType;

    @Property()
    authenticationStrategy: string;

    // async doAfterCreate(args)
    // private async clearSessionCacheOnDataChange(
    //     eventArgs: EventArgs<Session>
    // ) {
    //     if (eventArgs.entity) {
    //     }
    // }
}
