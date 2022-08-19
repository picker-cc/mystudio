import { Embeddable, Embedded, Property } from "@mikro-orm/core";
import {ID} from "@picker-cc/common/lib/shared-types";

import {
    MenuObjectType,
    ProductState,
    ProductSubscriptionPeriod,
    ProductType
} from "@picker-cc/common/lib/generated-types";

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
export class ProtectOption {
    @Property()
    type: string;
    @Property()
    method?: string;
}

@Embeddable()
export class PageOption {
    template: string
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
    protect?: ProtectOption[]
}

/**
 * 导航菜单项
 */
@Embeddable()
export class NavMenuItemOption {
    @Property()
    objectType: MenuObjectType
    // objectType: 'POST' | 'PAGE' | 'LINK' | 'PRODUCT';
    @Property()
    objectId?: ID
    @Property()
    url?: string;
}
@Embeddable()
export class ContentOption {
    type: 'MARKDOWN' | 'EDITOR_JSON'
}

/**
 * 作品配置
 */
@Embeddable()
export class PostSetting {
    @Property()
    content: ContentOption
    @Property()
    menu?: NavMenuItemOption
    // 作品保护设置
    @Property()
    product?: ProductSetting[]
    @Property()
    page?: PageOption
}

@Embeddable()
export class PostMeta {
    // @Embedded({object: true})
    // menuItem?: NavMenuItem;
    // @Embedded({object: true})
    // productSetting?: ProductSetting;
    // @Embedded({object: true})
    // parser?: ContentParser;
    @Property()
    key: String
    @Property()
    value: String
    @Property()
    detail?: String
}
