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

    @Property()
    url: string;
    // 标识
    @Property()
    slug: string;

    // default post
    @Property()
    type: string;

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
    @Property()
    terms: Term[];

    // @Property()
    // tags: Term[];
    //
    // 发布状态
    @Property()
    state: string;

    // @Property()
    // password: string;

    @ManyToMany(() => Asset)
    assets = new Collection<Asset>(this);

    // 是否允许评论
    @Property()
    allowComment: boolean;

    // 评论数
    @Property()
    commentCount: number;

    // 排序
    @Property()
    menuOrder: number;

    // 特色图
    @Property()
    featured: Asset;

    @Property()
    parent: ID;

    // @Property()
    // settings: string;

    @Property()
    meta: string;
}
