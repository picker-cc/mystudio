/**
 * @file 评论模块数据模型
 */

import {
    Collection,
    Embeddable,
    Embedded,
    Entity,
    Index,
    ManyToMany,
    ManyToOne,
    OneToOne,
    Property,
} from '@mikro-orm/core';
import {DeepPartial, HasCustomFields, ID} from '@picker-cc/common/lib/shared-types';

import { SoftDeletable } from '../../common/types/common-types';
import { PickerMongoEntity } from '../base/mongo-base.entity';
import { User } from '../user/user.entity';

@Entity()
export class PostComment extends PickerMongoEntity
    implements SoftDeletable
{
    constructor(input: DeepPartial<PostComment>) {
        super(input);
    }
    @Index()
    // 评论给
    @Property()
    to: string;
    // 来自
    @Index()
    @Property()
    from: ID;
    @Index()
    @Property()
    deletedAt: Date;

    // 评论所在的饮食记录 Id
    @Index()
    @Property()
    foodlogId: ID;
    // 父级评论 Id
    @Index()
    @Property({ default: 'root', index: true })
    pid: string;

    @Property()
    content: string;

    // 评论作者
    @ManyToOne({ eager: true })
    author: User;

    // 评论发布状态
    // @IsIn([ECommentState.Auditing, ECommentState.Deleted, ECommentState.Published, ECommentState.Spam])
    // @IsInt()
    // @Property({ enum: ECommentState, default: ECommentState.Published, index: true })
    // @Property({ default: ECommentState.Published })
    // state: ECommentState;
    //
    // @Embedded(() => FoodlogCommentMeta, { object: true })
    // meta: FoodlogCommentMeta;
    //
    // @ManyToMany(() => FoodlogComment)
    // discuss = new Collection<FoodlogComment>(this);
}
