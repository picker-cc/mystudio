import {DeepPartial} from "@picker-cc/common/lib/shared-types";
import {AnimalType, AuthenticationMethod} from './authentication-method.entity';
import {Embeddable, Property} from "@mikro-orm/core";

/**
 * @description
 * 内置默认的认证方法（标识验证），使用一个标识符（通常是用户名或电子邮件地址）和密码组合来验证用户
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
@Embeddable({ discriminatorValue: 'NativeAuthenticationMethod'})
export class NativeAuthenticationMethod extends AuthenticationMethod {
    // constructor(input?: DeepPartial<NativeAuthenticationMethod>) {
    //     super(input);
    // }

    constructor(passwordHash: string) {
        super();
        this.passwordHash = passwordHash
        this.type = AnimalType.NativeAuthenticationMethod;
    }
    // @Property()
    // identifier: string;
    //
    @Property() passwordHash: string;

    @Property({type: 'string', nullable: true})
    verificationToken: string | null;

    @Property({type: 'string', nullable: true})
    passwordResetToken: string | null;

    /**
     * @description
     * 当用户请求更改其标识符蛙发出的令牌（通常是电子邮件地址）
     */
    @Property({type: 'string', nullable: true})
    identifierChangeToken: string | null;

    /**
     * @description
     * 当请求更改用户的标识符时，新的标识符将被存储在这里，直到它被验证，
     * 然后它将被验证替换`identifier`字段的当前值.
     */
    @Property({type: 'string', nullable: true})
    pendingIdentifier: string | null;
}
