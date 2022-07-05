import {
    Collection,
    Embeddable,
    Embedded,
    Entity,
    Index,
    ManyToMany,
    ManyToOne,
    OneToOne,
    Property
} from '@mikro-orm/core';

import { SoftDeletable } from '../../common';
import {User} from "../user/user.entity";
import {Asset} from "../asset/asset.entity";
import {Term} from "../taxonomy/term.entity";
import {PickerMongoEntity} from "../base/mongo-base.entity";
import {DeepPartial, ID} from "@picker-cc/common/lib/shared-types";
import {PostType} from "@picker-cc/common/lib/generated-types";
import {PostMeta} from "./post.embedded";

@Entity({
    tableName: 'posts',
})
export class Post extends PickerMongoEntity implements SoftDeletable {
    constructor(input?: DeepPartial<Post>) {
        super(input);
    }
    @Property({ type: Date, nullable: true })
    deletedAt: Date;

    @Property()
    title: string;

    @Property({
        type: Date,
    })
    date = new Date()

    @Property({nullable: true})
    url: string;
    // 标识
    @Property()
    slug: string;

    // default post
    @Property()
    type: PostType;

    // 内容摘要
    // @Property()
    // excerpt: any;
    //
    @Property()
    content: any;

    // 数据来源
    // 所属用户
    @ManyToOne(() => User)
    creator: User

    // 分类
    @Property({nullable: true})
    terms: Term[];
    //
    // @Property()
    // tags: Term[];
    //
    // 发布状态
    @Property({ nullable: true})
    state: string;

    // @Property()
    // password: string;

    // @ManyToMany(() => Asset)
    // assets = new Collection<Asset>(this);
    // @ManyToMany(() => Asset)
    // assets? = new Collection<Asset>(this);

    // 是否允许评论
    @Property({default: false})
    allowComment: boolean;

    // 评论数
    @Property({nullable: true})
    commentCount: number;

    // 排序
    @Property({nullable: true})
    order: number;

    // 特色图
    @Property({nullable: true})
    featured: Asset;

    @Property({ nullable: true})
    parent: ID;

    // @Property()
    // settings: string;

    // @Property({ nullable: true})
    @Embedded()
    meta: PostMeta;
}
