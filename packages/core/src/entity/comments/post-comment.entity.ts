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
import { CommentState } from '@picker-cc/common/lib/generated-types';
import {DeepPartial, HasCustomFields, ID} from '@picker-cc/common/lib/shared-types';

import { SoftDeletable } from '../../common/types/common-types';
import { PickerMongoEntity } from '../base/mongo-base.entity';
import { User } from '../user/user.entity';
import { PostCommentMeta } from './post-comment.embedded';

@Entity()
export class PostComment extends PickerMongoEntity
    implements SoftDeletable
{
    constructor(input: DeepPartial<PostComment>) {
        super(input);
    }
    // 评论给
    @Index()
    @Property()
    to: string;
    // 来自
    @Index()
    @Property()
    from: ID;
    @Index()
    @Property()
    deletedAt: Date;

    // 评论所在的 PostId
    @Index()
    @Property()
    postId: ID;
    // 父级评论 Id
    @Index()
    @Property({ default: 'root', index: true })
    parent: string;

    @Property()
    content: string;

    // 评论作者
    @ManyToOne({ eager: true })
    author: User;


    // 评论发布状态
    // @IsIn([ECommentState.Auditing, ECommentState.Deleted, ECommentState.Published, ECommentState.Spam])
    // @Property({ enum: ECommentState, default: ECommentState.Published, index: true })
    // // @Property({ default: ECommentState.Published })
    @Property({default: CommentState.PENDING, index: true})
    state: CommentState;
    //
    @Embedded(() => PostCommentMeta, { object: true })
    meta: PostCommentMeta;
    //
    // @ManyToMany(() => FoodlogComment)
    // discuss = new Collection<FoodlogComment>(this);
}
