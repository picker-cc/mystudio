import {Injectable, OnModuleInit} from "@nestjs/common";
import {EntityManager} from "@mikro-orm/mongodb";
import {ConfigService} from "../../config";
import {AuthZRBACService} from "nest-authz";
import {PasswordCipher} from "../helpers/password-cipher/password-cipher";
import {VerificationTokenGenerator} from "../helpers/verification-token-generator";
import {AssetService} from "./asset.service";
import {EventBus} from "../../event-bus";
import {RequestContext} from '../../api';
import {
    InvalidCredentialsError,
    PasswordResetTokenExpiredError,
    PasswordResetTokenInvalidError, PasswordValidationError,
} from "../../common/error/generated-graphql-admin-errors";
import {User} from "../../entity";
import {FilterQuery} from "@mikro-orm/core";
import {ID} from "@picker-cc/common/lib/shared-types";
import {EntityNotFoundError} from "../../common";
import {DeletionResult} from "@picker-cc/common/lib/generated-types";
import {NativeAuthenticationMethod} from "../../entity/authentication-method";

@Injectable()
export class UserService {
    constructor(
        private readonly em: EntityManager,
        private readonly configService: ConfigService,
        private readonly authService: AuthZRBACService,
        private passwordCipher: PasswordCipher,
        private verificationTokenGenerator: VerificationTokenGenerator,
        private readonly eventBus: EventBus,
        private readonly assetService: AssetService,
    ) {
    }


    async getUserById(userId: ID): Promise<User | undefined> {
        // return this.em.getRepository(User).findOne({
        //   id: userId,
        // }, [ 'roles', 'authenticationMethods' ]);
        return this.em.getRepository(User).findOne({
            id: userId,
        });
    }


    async getUserByEmailAddress(ctx: RequestContext, emailAddress: string): Promise<User | undefined> {
        return this.em.getRepository(User).findOne({
            identifier: emailAddress,
            deletedAt: null,
        });
    }

    async getUserByIdentifier(ctx: RequestContext, identifier: string): Promise<User | undefined> {
        return this.em.getRepository(User).findOne({
            identifier,
            deletedAt: null,
        });
    }


    async createAdminUser(ctx: RequestContext, identifier: string, password: string): Promise<User> {
        const adminUser = new User({
            identifier,
            verified: true,
            authenticationMethods: [
                new NativeAuthenticationMethod({
                    identifier,
                    passwordHash: await this.passwordCipher.hash(password)
                })
            ]
        })
        // adminUser.authenticationMethods.push(new NativeAuthenticationMethod({
        //     passwordHash: await this.passwordCipher.hash(password)
        // }))

        // adminUser.roles = [{
        //     code: UserRoleType
        // }]
        await this.em.persistAndFlush(adminUser);

        return adminUser
    }

    /**
     * 逻辑删除
     * @param ctx
     * @param userId
     */
    async softDelete(ctx: RequestContext, userId: ID) {
        await this.em.findOneOrFail(User, {id: userId});
        await this.em.nativeUpdate(User, {id: userId}, {deletedAt: new Date()});
        return {
            result: DeletionResult.DELETED,
        };
    }


    /**
     * 更新我的个人特色图片/头像
     * @param ctx
     * @param featuredId
     */
    async updateMyFeatured(ctx: RequestContext, featuredId: string | number): Promise<User> {
        const userId = ctx.session.user.id;
        const findUser = await this.em.findOne(User, {
            id: userId,
        });
        findUser.featured = Object.assign({}, findUser.featured, {id: featuredId});
        await this.em.persistAndFlush(findUser);

        return findUser;
    }

    /**
     * @description
     * 方法查找先前已设置passwordResetToken的用户，从而验证passwordResetToken
     * ' setPasswordResetToken() '方法，并检查令牌是否有效且未过期。
     *
     * 如果有效，用户的凭证将被更新为新密码。
     */
    async resetPasswordByToken(
        ctx: RequestContext,
        passwordResetToken: string,
        password: string,
    ): Promise<User | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | PasswordValidationError> {
        const user = await this.em.findOne(User, {
            ['authenticationMethods.passwordResetToken']: passwordResetToken
        } as FilterQuery<User>);

        if (!user) {
            return new PasswordResetTokenInvalidError();
        }
        const passwordValidationResult = await this.validatePassword(ctx, password);
        if (passwordValidationResult !== true) {
            return passwordValidationResult
        }
        if (this.verificationTokenGenerator.verifyVerificationToken(passwordResetToken)) {
            const nativeAuthMethod = user.getNativeAuthenticationMethod();
            nativeAuthMethod.passwordHash = await this.passwordCipher.hash(password);
            nativeAuthMethod.passwordResetToken = null
            await this.em.persistAndFlush(user)
            return user;
        } else {
            return new PasswordResetTokenExpiredError();
        }
    }

    /**
     * @description
     *
     * 使用 {@link NativeAuthenticationMethd} 更新用户密码
     * @param ctx
     * @param userId
     * @param currentPassword
     * @param newPassword
     */
    async updatePassword(
        ctx: RequestContext,
        userId: ID,
        currentPassword: string,
        newPassword: string,
    ): Promise<boolean | InvalidCredentialsError> {
        const user = await this.em.findOneOrFail(
            User,
            {
                id: userId,
            },
            {
                fields: [ 'authenticationMethods' ],
            },
        );
        if (!user) {
            throw new EntityNotFoundError('User', userId)
        }

        const nativeAuthMethod = user.getNativeAuthenticationMethod();

        const matches = await this.passwordCipher.check(currentPassword, nativeAuthMethod.passwordHash);
        if (!matches) {
            return new InvalidCredentialsError('');
        }
        nativeAuthMethod.passwordHash = await this.passwordCipher.hash(newPassword);
        // user.password = await this.passwordCipher.hash(newPassword);
        // console.log(user)
        await this.em.persistAndFlush(user);
        return true;
    }


    private async validatePassword(
        ctx: RequestContext,
        password: string,
    ): Promise<true | PasswordValidationError> {
        const passwordValidationResult =
            await this.configService.authOptions.passwordValidationStrategy.validate(ctx, password);
        if (passwordValidationResult !== true) {
            const message =
                typeof passwordValidationResult === 'string'
                    ? passwordValidationResult
                    : 'Password is invalid';
            return new PasswordValidationError(message);
        } else {
            return true;
        }
    }
}
