import {
    AuthenticationResult as AdminAuthenticationResult,
    AuthenticationResult as StudioAuthenticationResult,
    CurrentUser, MutationAuthenticateArgs,
    MutationLoginArgs,
    Permission, Success,
} from '@picker-cc/common/lib/generated-types';
import {Request, Response} from 'express';
import {AdministratorService} from '../../../service/services/administrator.service';
import {AuthService} from '../../../service/services/auth.service';
import {UserService} from '../../../service/services/user.service';
import {ConfigService, Logger, LogLevel} from "../../../config";
import {AssetService} from '../../../service/services/asset.service';
import {RequestContext} from "../../common/request-context";
import {ApiType} from "../../common/get-api-type";
import {InvalidCredentialsError, NotVerifiedError} from "../../../common/error/generated-graphql-admin-errors";
import {extractSessionToken} from "../../common/extract-auth-token";
import {NATIVE_AUTH_STRATEGY_NAME} from '../../../config/auth/native-authentication-strategy';
import {ForbiddenError, isGraphQlErrorResult} from "../../../common";
import {setSessionToken} from "../../common/set-session-token";
import {User} from "../../../entity";
import {AuthZRBACService} from "nest-authz";
import {
    NativeAuthStrategyError as AdminNativeAuthStrategyError
} from '../../../common/error/generated-graphql-admin-errors';
import {
    NativeAuthStrategyError as StudioNativeAuthStrategyError
} from '../../../common/error/generated-graphql-studio-errors';
import {unique} from '@picker-cc/common/lib/unique';
import {getUserPermissions} from "../../../service/helpers/get-user-permissions";

export class BaseAuthResolver {
    protected readonly nativeAuthStrategyIsConfigured: boolean;

    constructor(
        protected authService: AuthService,
        protected authzService: AuthZRBACService,
        protected userService: UserService,
        protected administratorService: AdministratorService,
        protected configService: ConfigService,
        protected assetService: AssetService,
    ) {
        this.nativeAuthStrategyIsConfigured =
            !!this.configService.authOptions.studioAuthenticationStrategy.find(
                strategy => strategy.name === NATIVE_AUTH_STRATEGY_NAME,
            );
    }

    async baseLogin(
        args: MutationLoginArgs,
        ctx: RequestContext,
        req: Request,
        res: Response,
    ): Promise<AdminAuthenticationResult | StudioAuthenticationResult | NotVerifiedError> {
        return await this.authenticateAndCreateSession(
            ctx,
            {
                input: {[NATIVE_AUTH_STRATEGY_NAME]: args},
                rememberMe: args.rememberMe,
            },
            req,
            res,
        );
    }

    async logout(ctx: RequestContext, req: Request, res: Response): Promise<Success> {
        const token = extractSessionToken(req, this.configService.authOptions.tokenMethod);
        if (!token) {
            return {success: false};
        }
        await this.authService.destroyAuthenticatedSession(ctx, token);

        setSessionToken({
            req,
            res,
            authOptions: this.configService.authOptions,
            rememberMe: false,
            sessionToken: '',
        })
        return {success: true}
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
                throw new ForbiddenError(LogLevel.Verbose);
            }
        }
        const user = userId && (await this.userService.getUserById(userId));
        // const casbinDomain = apiType === 'csm' ? DomainEnum.DOMAIN_CSM : DomainEnum.DOMAIN_ADMIN;
        // const roles = await this.casbinService.getRolesForUser(user.id.toString(), casbinDomain);
        // const roles = await this.authzService.getRolesForUser(user.id.toString());
        // const findPermissions = await this.authzService.getPermissionsForUser(user.id.toString());
        // const findPermissions = await this.casbinService.getPermissionsForUser(user.id.toString());
        // const permissions: Permission[] = [];
        //
        // if (findPermissions.length > 0) {
        //     for (let i = 1; i < findPermissions[0].length; i++) {
        //         const permissionKey = findPermissions[0][i];
        //         // permissions.push(findPermissions[i])
        //         if (Permission[permissionKey]) {
        //             permissions.push(Permission[permissionKey]);
        //         }
        //     }
        // }
        // console.log(permissions)
        // if (roles.length > 0) {
        //     user.roles = [];
        //     roles.forEach(role => {
        //         user.roles.push({
        //             code: UserRoleType[role] || role,
        //             permissions,
        //             description: '',
        //         });
        //     });
        // }
        if (user.featured?.id) {
            user.featured = await this.assetService.findOne(ctx, user.featured.id);
        }
        return user ? this.publiclyAccessibleUser(user, ctx.session.token) : null;
    }

    /**
     * Creates an authenticated session and sets the session token.
     */
    protected async authenticateAndCreateSession(
        ctx: RequestContext,
        args: MutationAuthenticateArgs,
        req: Request,
        res: Response,
    ): Promise<AdminAuthenticationResult | StudioAuthenticationResult | NotVerifiedError> {
        const [ method, data ] = Object.entries(args.input)[0];
        const {apiType} = ctx;
        const session = await this.authService.authenticate(ctx, apiType, method, data);
        if (isGraphQlErrorResult(session)) {
            return session;
        }
        if (apiType && apiType === 'admin') {
            const administrator = await this.administratorService.findOneByUserId(ctx, session.user.id);
            // TODO 当前管理员仅允许 admin 域用户，csm 域管理用户待定
            // console.log(administrator)
            // if (!administrator || administrator.domain !== DomainEnum.DOMAIN_ADMIN) {
            //     return new InvalidCredentialsError('');
            // }
            if (apiType && apiType === 'admin') {
                const administrator = await this.administratorService.findOneByUserId(ctx, session.user.id);
                if (!administrator) {
                    return new InvalidCredentialsError('');
                }
            }
        }

        setSessionToken({
            req,
            res,
            authOptions: this.configService.authOptions,
            rememberMe: args.rememberMe || false,
            sessionToken: session.token,
        })

        return this.publiclyAccessibleUser(session.user, session.token);
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
     * 公开我们想要公开给公共API的User属性的子集
     */
    private async publiclyAccessibleUser(user: User, token: string): Promise<CurrentUser> {
        // let permissions = []
        // for (const role of user.roles) {
        //     permissions = unique([
        //         ...role.permissions
        //     ])
        // }
        return {
            id: user.id,
            token,
            permissions: getUserPermissions(user),
        };
    }

    protected requireNativeAuthStrategy():
        | AdminNativeAuthStrategyError
        | StudioNativeAuthStrategyError
        | undefined {
        if (!this.nativeAuthStrategyIsConfigured) {
            const authStrategyNames = this.configService.authOptions.studioAuthenticationStrategy
                .map(s => s.name)
                .join(', ');
            const errorMessage =
                '这个 GraphQL 操作要求为 Studio API 配置 NativeAuthenticationStategy。\n' +
                `当前启用的谁上策略如下: ${authStrategyNames}`;
            Logger.error(errorMessage);
            return new AdminNativeAuthStrategyError();
        }
    }
}
