import { Session } from './session.entity';
import {DeepPartial} from "@picker-cc/common/lib/shared-types";
import {Entity} from "@mikro-orm/core";

/**
 * @description
 * 匿名会话是在未经身份验证的用户与受限操作进行交互时创建的，
 * 比如在Shop API中调用' activeOrder '查询。匿名会话允许客户Customer
 * 不需要身份验证和预先注册帐户就可以维护订单。
 *
 * @docsCategory entities
 */
@Entity()
export class AnonymousSession extends Session {
    constructor(input: DeepPartial<AnonymousSession>) {
        super(input);
    }
}
