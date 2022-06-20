import {EntityManager} from "@mikro-orm/mongodb";
import {ListQueryBuilder} from "../helpers/list-query-builder/list-query-builder";
import {ConfigService} from "../../config";
import {EventBus} from "../../event-bus";
import {getAllPermissionsMetadata} from "../../common/constants";
import {CreateRoleInput, DeletionResponse, DeletionResult, Permission, UpdateRoleInput} from "@picker-cc/common/lib/generated-types";
import {AuthZRBACService} from "nest-authz";
import {Role} from "../../entity/role/role.entity";
import {EntityNotFoundError, InternalServerError, UserInputError} from "../../common/error/errors";
import {
    CUSTOMER_ROLE_CODE,
    SUPER_ADMIN_ROLE_CODE,
    SUPER_ADMIN_ROLE_DESCRIPTION
} from "@picker-cc/common/lib/shared-constants";
import {unique} from "@picker-cc/common/lib/unique";
import {RequestContext} from "../../api";
import { RoleEvent } from "../../event-bus/events/role-event";
import {ID, PaginatedList} from "@picker-cc/common/lib/shared-types";
import {patchEntity} from "../helpers/utils/patch-entity";
import {assertFound, ListQueryOptions} from "../../common";
import {Term} from "../../entity/taxonomy/term.entity";
import {Injectable} from "@nestjs/common";
import {MikroORM, UseRequestContext} from "@mikro-orm/core";

@Injectable()
export class RoleService {
    constructor(
        private em: EntityManager,
        private readonly orm: MikroORM,
        private listQueryBuilder: ListQueryBuilder,
        private configService: ConfigService,
        private eventBus: EventBus,
        private readonly authzService: AuthZRBACService,
    ) {
    }
    @UseRequestContext()
    async initRoles() {
        await this.ensureSuperAdminRoleExists();
        // await this.ensureCustomerRoleExists();
        // await this.ensureRolesHaveValidPermissions();
    }

    findAll(ctx: RequestContext, options?: ListQueryOptions<Role>): Promise<PaginatedList<Role>> {
        return this.listQueryBuilder.build(Role, options, {
            // populate: [ 'featured' ] as any
        }).then(([ items, totalItems ]) => ({
            items,
            totalItems
        }))
    }
    /**
     * 查找一个角色
     * @param ctx
     * @param roleId
     */
    findOne(ctx: RequestContext, roleId: ID): Promise<Role | undefined> {
        return this.em.findOne(Role, {id: roleId})
    }
    /**
     * @description
     * Returns the special SuperAdmin Role, which always exists in Picker.
     */
    getSuperAdminRole(): Promise<Role> {
        return this.getRoleByCode(SUPER_ADMIN_ROLE_CODE).then(role => {
            if (!role) {
                throw new InternalServerError(`error.super-admin-role-not-found`);
            }
            return role;
        });
    }
    /**
     * @description
     * Returns the special Customer Role, which always exists in Picker.
     */
    getCustomerRole(): Promise<Role> {
        return this.getRoleByCode(CUSTOMER_ROLE_CODE).then(role => {
            if (!role) {
                throw new InternalServerError(`error.customer-role-not-found`);
            }
            return role;
        });
    }

    /**
     * 创建角色
     * @param ctx
     * @param input
     */
    async create(ctx: RequestContext, input: CreateRoleInput): Promise<Role> {
        this.checkPermissionsAreValid(input.permissions);

        const role = await this.createRoleForStudio(ctx, input);
        this.eventBus.publish(new RoleEvent(ctx, role, 'created', input))

        return role
    }

    /**
     * 更新角色
     * @param ctx
     * @param input
     */
    async update(ctx: RequestContext, input: UpdateRoleInput): Promise<Role> {
        this.checkPermissionsAreValid(input.permissions);
        const role = await this.em.findOne(Role, {id: input.id})
        if (!role) {
            throw new EntityNotFoundError('Role', input.id);
        }
        if (role.code === SUPER_ADMIN_ROLE_CODE || role.code === CUSTOMER_ROLE_CODE) {
            throw new InternalServerError(`error.cannot-modify-role`, { roleCode: role.code });
        }
        const updatedRole = patchEntity(role, {
            code: input.code,
            description: input.description,
            permissions: input.permissions
                ? unique([Permission.Authenticated, ...input.permissions])
                : undefined,
        });
        // await this.connection.getRepository(ctx, Role).save(updatedRole, { reload: false });
        await this.em.persistAndFlush(updatedRole);
        this.eventBus.publish(new RoleEvent(ctx, role, 'updated', input));
        // return await assertFound(this.em.findOne(Role, {id: role.id}));
        return updatedRole
    }

    /**
     * 删除角色
     * @param ctx
     * @param id
     */
    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const role = await this.em.findOne(Role, {id});
        if (!role) {
            throw new EntityNotFoundError('Role', id)
        }
        if (role.code === SUPER_ADMIN_ROLE_CODE || role.code === CUSTOMER_ROLE_CODE) {
            throw new InternalServerError(`error.cannot-delete-role`, { roleCode: role.code });
        }
        await this.em.removeAndFlush(role)
        this.eventBus.publish(new RoleEvent(ctx, role, 'deleted', id));
        return {
            result: DeletionResult.DELETED,
        };
    }
    private checkPermissionsAreValid(permissions?: Permission[] | null) {
        if (!permissions) {
            return;
        }
        const allAssignablePermissions = this.getAllAssignablePermissions();
        for (const permission of permissions) {
            if (!allAssignablePermissions.includes(permission) || permission === Permission.SuperAdmin) {
                throw new UserInputError('error.permission-invalid', {permission});
            }
        }
    }

    private getRoleByCode(code: string): Promise<Role | undefined> {
        return this.em.findOne(Role, {
            code,
        })
    }

    /**
     * Ensure that the SuperAdmin role exists and that it has all possible Permissions.
     * 确保 SuperAdmin 角色存在并且拥有所有可能的权限
     */
    private async ensureSuperAdminRoleExists() {

        const assignablePermissions = this.getAllAssignablePermissions();
        try {
            const superAdminRole = await this.getSuperAdminRole();
            superAdminRole.permissions = assignablePermissions;
            await this.orm.em.persistAndFlush(superAdminRole)
        } catch (err) {
            await this.createRoleForStudio(
                RequestContext.empty(),
                {
                    code: SUPER_ADMIN_ROLE_CODE,
                    description: SUPER_ADMIN_ROLE_DESCRIPTION,
                    permissions: assignablePermissions,
                }
            )
        }
    }
    /**
     * 由于自定义权限可以通过配置添加和删除，
     * 可能存在一个或多个具有无效权限的角色(即之前设置为自定义权限的权限，随后已从配置中删除)。
     * 这个方法应该在启动时运行，以确保任何这样的无效
     * 从这些角色中删除权限。
     */
    private async ensureRolesHaveValidPermissions() {
        // const roles = await this.connection.getRepository(Role).find();
        // const assignablePermissions = this.getAllAssignablePermissions();
        // for (const role of roles) {
        //     const invalidPermissions = role.permissions.filter(p => !assignablePermissions.includes(p));
        //     if (invalidPermissions.length) {
        //         role.permissions = role.permissions.filter(p => assignablePermissions.includes(p));
        //         await this.connection.getRepository(Role).save(role);
        //     }
        // }
    }

    private createRoleForStudio(ctx: RequestContext, input: CreateRoleInput) {
        const role = new Role({
            code: input.code,
            description: input.description,
            permissions: unique([ Permission.Authenticated, ...input.permissions ]),
        })
        this.em.persistAndFlush(role);
        return role;
    }

    /**
     * 获取全部分配的权限
     * @private
     */
    private getAllAssignablePermissions(): Permission[] {
        return getAllPermissionsMetadata(this.configService.authOptions.customPermissions)
            .filter(p => p.assignable)
            .map(p => p.name as Permission);
    }
}
