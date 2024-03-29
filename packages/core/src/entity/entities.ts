import {Option} from './option/option.entity';
import {Asset} from "./asset/asset.entity";
import {AuthenticationMethod, NativeAuthenticationMethod, ExternalAuthenticationMethod} from "./authentication-method";
import {User, UserRole} from "./user";
import {Session} from "./session/session.entity";
import {Administrator} from "./administrator/administrator.entity";
import {Term} from './taxonomy/term.entity'
// import {Product, ProductSetting, ProtectSetting, DiffPriceOption} from './product/product.entity'
import {Role} from './role/role.entity';
import {Order} from "./order/order.entity";
import {Customer} from "./customer/customer.entity";
import {CustomerGroup} from "./customer-group/customer-group.entity";
import {Post} from "./posts/post.entity";
import {ContentOption, DiffPriceOption, NavMenuItemOption, PostMeta, PostSetting, ProductSetting, ProtectOption} from './posts/post.embedded';

/**
 * 所有核心数据库实体的映射。
 */
export const coreEntitiesMap = {
    Post, PostMeta, NavMenuItemOption, ContentOption, PostSetting, ProductSetting, ProtectOption, DiffPriceOption,
    Term,
    Option,
    Asset,
    AuthenticationMethod,
    NativeAuthenticationMethod,
    ExternalAuthenticationMethod,
    User, UserRole,
    Role,
    Administrator,
    Session,
    Order,
    Customer,
    CustomerGroup,
}
