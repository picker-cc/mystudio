import {
    AuthenticationResult as AdminAuthenticationResult,
    AuthenticationResult as CsmAuthenticationResult,
    CurrentUser,
    DomainEnum,
    MutationLoginArgs,
    Permission,
    UserRoleType,
} from '@picker-cc/common/lib/generated-types';
import { Request, Response } from 'express';

import { CasbinService } from '../../casbin/casbin.service';
import { ForbiddenError, InvalidCredentialsError, isGraphQlErrorResult } from '../../common';
import { NotVerifiedError } from '../../common/error/generated-graphql-csm-errors';
import { ConfigService } from '../../config';
import { User } from '../../entity/user/user.entity';
import { AdministratorService, AssetService, AuthService, UserService } from '../../service';
import { extractSessionToken } from '../common/extract-auth-token';
import { ApiType } from '../common/get-api-type';
import { RequestContext } from '../common/request-context';
import { setAuthToken } from '../common/set-auth-token';

export class BaseAuthResolver {
    constructor(
        protected authService: AuthService,
        protected userService: UserService,
        protected administratorService: AdministratorService,
        protected configService: ConfigService,
        protected casbinService: CasbinService,
        protected assetService: AssetService,
    ) {}

    async baseLogin(
        args: MutationLoginArgs,
        ctx: RequestContext,
        req: Request,
        res: Response,
        apiType: ApiType,
    ): Promise<AdminAuthenticationResult | CsmAuthenticationResult | NotVerifiedError> {
        return await this.authenticateAndCreateSession(ctx, args, req, res, apiType);
    }

    async logout(ctx: RequestContext, req: Request, res: Response): Promise<boolean> {
        const token = extractSessionToken(req, this.configService.authOptions.tokenMethod);
        if (!token) {
            return false;
        }
        await this.authService.deleteSessionByToken(ctx, token);
        setAuthToken({
            req,
            res,
            authOptions: this.configService.authOptions,
            rememberMe: false,
            authToken: '',
        });
        return true;
    }

    /**
     * Returns information about the current authenticated user.
     */
    async me(ctx: RequestContext, apiType: ApiType) {
        const userId = ctx.activeUserId;
        if (!userId) {
            throw new ForbiddenError();
        }
        if (apiType === 'admin') {
            const administrator = await this.administratorService.findOneByUserId(ctx, userId);
            if (!administrator) {
                throw new ForbiddenError();
            }
        }
        const user = userId && (await this.userService.getUserById(userId));
        const casbinDomain = apiType === 'csm' ? DomainEnum.DOMAIN_CSM : DomainEnum.DOMAIN_ADMIN;
        const roles = await this.casbinService.getRolesForUser(user.id.toString(), casbinDomain);
        const findPermissions = await this.casbinService.getPermissionsForUser(user.id.toString());
        const permissions: Permission[] = [];
        if (findPermissions.length > 0) {
            for (let i = 1; i < findPermissions[0].length; i++) {
                const permissionKey = findPermissions[0][i];
                // permissions.push(findPermissions[i])
                if (Permission[permissionKey]) {
                    permissions.push(Permission[permissionKey]);
                }
            }
        }
        // console.log(permissions)
        if (roles.length > 0) {
            user.roles = [];
            roles.forEach(role => {
                user.roles.push({
                    code: UserRoleType[role] || role,
                    permissions,
                    description: '',
                });
            });
        }
        if (user.featured?.id) {
            user.featured = await this.assetService.findOne(ctx, user.featured.id);
        }
        // return user ? this.publiclyAccessibleUser(ctx.session.user, ctx.session.token) : null;
        return user;
    }

    /**
     * Creates an authenticated session and sets the session token.
     */
    protected async authenticateAndCreateSession(
        ctx: RequestContext,
        args: MutationLoginArgs,
        req: Request,
        res: Response,
        apiType?: ApiType,
    ): Promise<AdminAuthenticationResult | InvalidCredentialsError | NotVerifiedError> {
        const session = await this.authService.authenticate(ctx, apiType, args.username, args.password);

        if (isGraphQlErrorResult(session)) {
            return session;
        }
        if (apiType && apiType === 'admin') {
            const administrator = await this.administratorService.findOneByUserId(ctx, session.user.id);
            // TODO 当前管理员仅允许 admin 域用户，csm 域管理用户待定
            // console.log(administrator)
            if (!administrator || administrator.domain !== DomainEnum.DOMAIN_ADMIN) {
                return new InvalidCredentialsError('');
            }
        }

        setAuthToken({
            req,
            res,
            authOptions: this.configService.authOptions,
            rememberMe: args.rememberMe || false,
            authToken: session.token,
        });
        return this.publiclyAccessibleUser(session.user, session.token);
        // return {
        //   // user: {
        //   //   id: session.user.id,
        //   //   identifier: session.user.identifier,
        //   //   token: session.token,
        //   //   permissions: [Permission.SuperAdmin],
        //   // },
        //   user: this.publiclyAccessibleUser(session.user),
        // };
    }

    // @Query()
    // async me(@Ctx() ctx: RequestContext, apiType: ApiType) {
    //   if (ctx.session) {
    //     // return await this.userService.getUserByIdentifier(ctx, ctx.session.identifier);
    //     // const user = ctx.session.user
    //     const userId = ctx.activeUserId;
    //     if (!userId) {
    //       throw new ForbiddenError();
    //     }
    //     if (apiType === 'admin') {
    //       const administrator = await this.administratorService.findOneByUserId(ctx, userId);
    //       if (!administrator) {
    //         throw new ForbiddenError();
    //       }
    //     }
    //     const user = userId && (await this.userService.getUserById(ctx, userId));
    //     return user ? this.publiclyAccessibleUser(user, ctx.session.token) : null
    //   }
    //   return undefined;
    // }
    /**
     * Updates the password of an existing User.
     */
    protected async updatePassword(
        ctx: RequestContext,
        currentPassword: string,
        newPassword: string,
    ): Promise<boolean | InvalidCredentialsError> {
        // const { activeUserId } = ctx.session.user.id;
        const userId = ctx.session.user.id;
        if (!userId) {
            throw new ForbiddenError();
        }
        return this.userService.updatePassword(ctx, userId, currentPassword, newPassword);
    }

    /**
     * Exposes a subset of the User properties which we want to expose to the public API.
     */
    private publiclyAccessibleUser(user: User, token: string): CurrentUser {
        return {
            id: user.id,
            identifier: user.identifier,
            token,
            permissions: [Permission.SuperAdmin],
        };
    }
}
