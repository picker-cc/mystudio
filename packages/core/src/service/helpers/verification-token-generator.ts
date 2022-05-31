import {Injectable} from '@nestjs/common';
import ms from 'ms';

import { generatePublicId, generateNo, generateCode } from '@picker-cc/common/lib/generate-public-id';
import {ConfigService} from "../../config";


/**
 * 这个类负责生成和验证在注册新账户或请求重置密码时发出的令牌
 */
@Injectable()
export class VerificationTokenGenerator {
  constructor(private configService: ConfigService) {
  }

  generateVerificationTokenForNum() {
    return generateCode()
  }
  /**
   * 生成一个验证令牌，该令牌编码生成时间，并将其与一个随机 id 连接。
   */
  generateVerificationToken() {
    const now = new Date();
    const base64Now = Buffer.from(now.toJSON()).toString('base64');
    const id = generatePublicId();
    return `${base64Now}_${id}`;
  }

  /**
   * 检查验证令牌的时效，看看它是否在令牌持续时间内。
   */
  verifyVerificationToken(token: string): boolean {
    const duration = ms(this.configService.authOptions.verificationTokenDuration as string);
    const [ generatedOn ] = token.split('_');
    const dateString = Buffer.from(generatedOn, 'base64').toString();
    const date = new Date(dateString);
    const elapsed = +new Date() - +date;
    return elapsed < duration;
  }
}
