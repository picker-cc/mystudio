import {User} from '../user/user.entity';
import {Embeddable, Entity, ManyToOne} from "@mikro-orm/core";
import {DeepPartial} from "@picker-cc/common/lib/shared-types";

/**
 * @description
 * AuthenticationMethod 表示用于验证用户 {@link User} 的方法。包含两种方案：
 * {@link NativeAuthenticationMethod} 和 {@link ExternalAuthenticationMethod}
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
// @Entity()
@Embeddable({ abstract: true, discriminatorColumn: 'authenticationMethods' })
export abstract class AuthenticationMethod {
    // @ManyToOne(type => User, {eager: true})
    // user: User;
    protected constructor(input?: DeepPartial<AuthenticationMethod>) {
        if (input) {
            for (const [key, value] of Object.entries(input as any)) {
                (this as any)[key] = value;
            }
        }
    }
}
