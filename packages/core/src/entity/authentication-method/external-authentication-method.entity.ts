import {DeepPartial} from "@picker-cc/common/lib/shared-types";

import { AuthenticationMethod } from './authentication-method.entity';
import {Embeddable, Entity, Property} from "@mikro-orm/core";

/**
 * @description
 * 使用外部认证服务对 PickerCC 用户认证时，使用此方法。
 * 例如：社交登录或企业身份服务器。
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
@Embeddable()
export class ExternalAuthenticationMethod extends AuthenticationMethod {
    constructor(input: DeepPartial<ExternalAuthenticationMethod>) {
        super(input);
    }

    @Property()
    strategy: string;

    @Property()
    externalIdentifier: string;

    @Property()
    metadata: any;
}
