import { Embeddable, Embedded, Property } from "@mikro-orm/core";
import {ID} from "@picker-cc/common/lib/shared-types";

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
 * 导航菜单项
 */
@Embeddable()
export class NavMenuItem {
    @Property()
    type: 'POST' | 'PAGE' | 'LINK';
    @Property()
    url?: string;
    @Property()
    object?: ID
}
@Embeddable()
export class ContentParser {
    type: 'MARKDOWN' | 'EDITOR_JSON'
}
@Embeddable()
export class PostMeta {
    @Embedded({object: true})
    menuItem?: NavMenuItem;
    @Embedded({object: true})
    productSetting?: ProductSetting;
    @Embedded({object: true})
    parser?: ContentParser;
}
