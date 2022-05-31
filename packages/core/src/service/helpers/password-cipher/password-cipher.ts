import {Injectable} from '@nestjs/common';
// import bcrypt from 'bcrypt';
import {ConfigService} from "../../../config";

// const SALT_ROUNDS = 12;

/**
 * 使用 bcrypt (https://en.wikipedia.org/wiki/Bcrypt)散列明文密码字符串的密码。
 */
@Injectable()
export class PasswordCipher {
    constructor(private configService: ConfigService) {}

    hash(plaintext: string): Promise<string> {
        return this.configService.authOptions.passwordHashingStrategy.hash(plaintext);
    }

    check(plaintext: string, hash: string): Promise<boolean> {
        return this.configService.authOptions.passwordHashingStrategy.check(plaintext, hash);
    }
    // hash(plaintext: string): Promise<string> {
    //     return bcrypt.hash(plaintext, SALT_ROUNDS);
    // }
    //
    // check(plaintext: string, hash: string): Promise<boolean> {
    //     return bcrypt.compare(plaintext, hash);
    // }
}
