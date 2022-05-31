import {Option} from './option/option.entity';
import {Asset} from "./asset/asset.entity";
import {AuthenticationMethod, NativeAuthenticationMethod, ExternalAuthenticationMethod} from "./authentication-method";
import {User, UserRole} from "./user";
import {Session} from "./session/session.entity";
import {Administrator} from "./administrator/administrator.entity";
import {Term} from './taxonomy/term.entity'
import {Product, ProductSetting, ProtectSetting, DiffPriceOption} from './product/product.entity'
import { Role } from './role/role.entity';

/**
 * 所有核心数据库实体的映射。
 */
export const coreEntitiesMap = {
    Product, ProductSetting, ProtectSetting, DiffPriceOption,
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
}
