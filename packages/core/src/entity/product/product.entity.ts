import {
    Collection,
    Embeddable,
    Embedded,
    Entity,
    Index, ManyToMany,
    ManyToOne,
    Property
} from '@mikro-orm/core';

import {SoftDeletable} from '../../common';
import {User} from '../user/user.entity';
import {Asset} from "../asset/asset.entity";
import {DeepPartial, ID} from '@picker-cc/common/lib/shared-types';
import {PickerMongoEntity} from "../base/mongo-base.entity";
import {ProductState, ProductSubscriptionPeriod, ProductType} from "@picker-cc/common/lib/generated-types";

/**
 * 作品的价格配置
 */
@Embeddable()
export class DiffPriceOption {
    // 版本名称
    @Property()
    versionName: string;
    // 价格
    @Property()
    price: number;
    // 信息
    @Property()
    info?: string;
}

/**
 * 作品的保护机制配置
 */
@Embeddable()
export class ProtectSetting {
    @Property()
    type: string;
    @Property()
    method?: string;
}

/**
 * 作品配置
 */
@Embeddable()
export class ProductSetting {
    // 作品定价
    @Property()
    price: number;
    // 作品差异化定价
    @Property()
    diffPrice: DiffPriceOption[]
    // 开启订阅制
    @Property()
    subscription?: ProductSubscriptionPeriod
    // 作品保护设置
    @Property()
    protect?: ProtectSetting[]
}
/**
 * 用户作品
 */
@Entity()
export class Product extends PickerMongoEntity implements SoftDeletable {
    constructor(input?: DeepPartial<Product>) {
        super(input);
    }

    // 报告是否被删除
    @Property({type: Date, nullable: true})
    deletedAt: Date | null;

    // 作品名称
    @Property()
    title: string;

    // 作品标识
    @Property()
    slug: string;

    // 作品是否启用
    @Property()
    enabled: boolean;
    // 作品类型
    @Index()
    @Property()
    type?: ProductType;

    // 创作者
    @ManyToOne(() => User, {cascade: []})
    creator?: User;

    // 特色图片（封面图）
    @ManyToOne()
    featured?: Asset;

    // 作品相关资产
    // @OneToMany(() => Asset, asset => )
    @ManyToMany(() => Asset)
    assets? = new Collection<Asset>(this);

    // 作品内容
    // @Embedded(() => ProductContent, {object: true})
    // content?: ProductContent;

    // 作品简介或作品公开的内容
    @Property()
    publicly?: string;
    // 作品付费内容 purchase
    @Property()
    content?: string;
    @Property()
    state: ProductState;

    // 作品选项配置
    @Embedded(() => ProductSetting, {object: true})
    setting: ProductSetting;

}
