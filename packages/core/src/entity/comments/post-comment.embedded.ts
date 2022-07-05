import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class PostCommentMeta {
    // @Property()
    // foodlogType: FoodLogTypeEnum
    // 标题
    @Property()
    title?: string;
    // 特色图片
    @Property()
    assets?: any[];
    // 点赞数据
    @Property()
    likes?: number;
    // 是否置顶
    @Property()
    isSticky?: boolean;
    // 用户ip
    @Property()
    ip?: string;
    // 用户 UA
    @Property()
    agent?: string;
    @Property()
    replies?: number;
}
