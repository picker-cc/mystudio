import {EntityManager} from "@mikro-orm/mongodb";
import {ConfigService} from "../../config";
import {UserService} from "./user.service";
import {ListQueryBuilder, parseFilterParams} from "../helpers/list-query-builder/list-query-builder";
import {PasswordCipher} from "../helpers/password-cipher/password-cipher";
import {Administrator, User} from "../../entity";
import {EntityNotFoundError, ListQueryOptions} from "../../common";
import {ID, PaginatedList} from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../api";
import {
    CreateAdministratorInput,
    DeletionResult,
    UpdateAdministratorInput
} from "@picker-cc/common/lib/generated-types";
import {patchEntity} from "../helpers/utils/patch-entity";
import {Injectable} from "@nestjs/common";
import {RoleService} from "./role.service";
import {MikroORM, UseRequestContext} from "@mikro-orm/core";
import { EventBus } from "../../event-bus";
import { AdministratorEvent } from "../../event-bus/events/administrator-event";

@Injectable()
export class AdministratorService {
    constructor(
        private readonly em: EntityManager,
        private readonly orm: MikroORM,
        private configService: ConfigService,
        private listQueryBuilder: ListQueryBuilder,
        private passwordCipher: PasswordCipher,
        private userService: UserService,
        private roleService: RoleService,
        private eventBus: EventBus,
    ) {
    }

    @UseRequestContext()
    async initAdministrators() {
        await this.ensureSuperAdminExists();
    }

    findOne(ctx: RequestContext, administratorId: ID): Promise<Administrator | undefined> {
        return this.em.findOne(Administrator, {
            id: administratorId,
            deletedAt: null,
        }, {
            populate: [ 'user' ]
        });
    }

    /**
     * @description
     * Get an Administrator based on the User id.
     */
    findOneByUserId(ctx: RequestContext, userId: ID): Promise<Administrator | undefined> {
        return this.em.findOne(Administrator, {
            user: new User({id: userId}),
            deletedAt: null,
        });
    }

    /**
     * @description
     * Get a paginated list of Administrators.
     */
    async findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Administrator>,
    ): Promise<PaginatedList<Administrator>> {
        return this.listQueryBuilder.build(Administrator, options, {
            populate: [ 'user' ] as any
        }).then(([ items, totalItems ]) => ({
            items,
            totalItems
        }))
    }

    /**
     * @description
     * Create a new Administrator.
     */
    async create(ctx: RequestContext, input: CreateAdministratorInput): Promise<Administrator> {
        let administrator = new Administrator(input);
        // TODO 当前这个功能不开放。

        // if (input.domain === DomainEnum.DOMAIN_ADMIN) {
        administrator.user = await this.userService.createAdminUser(ctx, input.emailAddress, input.password);
        // }
        // 存储管理员用户关联信息到 Admin 数据表中
        await this.orm.em
            .getRepository(Administrator).persistAndFlush(administrator);

        for (const roleId of input.roleIds) {
            administrator = await this.assignRole(ctx, administrator.id, roleId);
        }
        this.eventBus.publish(new AdministratorEvent(ctx, administrator, 'created', input));



        return administrator;
    }

    /**
     * @description
     * Update an existing Administrator.
     */
    async update(ctx: RequestContext, input: UpdateAdministratorInput): Promise<Administrator> {
        const administrator = await this.findOne(ctx, input.id);
        // return this.connection.findOneOrFail(Administrator, {
        //   id: input.id,
        // });
        if (!administrator) {
            throw new EntityNotFoundError('Administrator', input.id);
        }
        let updatedAdministrator = patchEntity(administrator, input);

        // await this.connection.getRepository(ctx, Administrator).save(administrator, { reload: false });
        //
        if (input.emailAddress) {
            updatedAdministrator.user.identifier = input.emailAddress;
            // await this.connection.getRepository(ctx, User).save(updatedAdministrator.user);
            await this.em.persistAndFlush(updatedAdministrator);
        }
        // if (input.password) {
        // }
        if (input.password) {
            const user = await this.userService.getUserById(administrator.user.id);
            const nativeAuthMethod = user.getNativeAuthenticationMethod();
            nativeAuthMethod.passwordHash = await this.passwordCipher.hash(input.password);
            // await this.userService.updatePassword(ctx, administrator.user.id, updatedAdministrator.user.password, input.password);
            await this.em.persistAndFlush(user);
        }
        return updatedAdministrator;
    }

    /**
     * @description
     * 为管理员的用户实体分配角色
     */
    async assignRole(ctx: RequestContext, administratorId: ID, roleId: ID): Promise<Administrator> {
        const administrator = await this.findOne(ctx, administratorId);
        if (!administrator) {
            throw new EntityNotFoundError('Administrator', administratorId);
        }
        const role = await this.roleService.findOne(ctx, roleId);
        if (!role) {
            throw new EntityNotFoundError('Role', roleId);
        }
        administrator.user.roles.add(role);
        // await this.connection.getRepository(ctx, User).save(administrator.user, { reload: false });
        await this.em.persistAndFlush(administrator.user);
        return administrator;
    }

    async softDelete(ctx: RequestContext, id: ID) {
        // const administrator = await this.connection.getEntityOrThrow(ctx, Administrator, id, {
        //   relations: ['user'],
        // });
        const administrator = await this.em.findOneOrFail(Administrator, {id}, {populate: [ 'user' ]});

        // await this.connection.getRepository(ctx, Administrator).update({ id }, { deletedAt: new Date() });
        // tslint:disable-next-line:no-non-null-assertion
        await this.userService.softDelete(ctx, administrator.user!.id);
        return {
            result: DeletionResult.DELETED,
        };
    }

    /**
     * 必须有一个超级管理员，否则通过API完全管理再也不可能了。
     */
    private async ensureSuperAdminExists() {
        const {superadminCredentials} = this.configService.authOptions;

        // let superAdminUser = null
        const superAdminUser = await this.orm.em.findOne(User, {
            identifier: superadminCredentials.identifier
        })
        // try {
        //     superAdminUser = await this.em.findOneOrFail(User, {
        //         identifier: superadminCredentials.identifier
        //     })
        // } catch (e) {

        // 如果超管不存在，则创建超管账号
        if (!superAdminUser) {
            const superAdminRole = await this.roleService.getSuperAdminRole();
            console.log(superAdminRole.id)
            const administrator = await this.create(RequestContext.empty(), {
                emailAddress: superadminCredentials.identifier,
                password: superadminCredentials.password,
                name: 'SuperAdmin',
                roleIds: [ superAdminRole.id ],
            });
        }
        // }
    }

}
