import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    DeletionResponse,
    MutationCreateAdministratorArgs, MutationDeleteAdministratorArgs, MutationEnabledAdministratorArgs,
    MutationUpdateAdministratorArgs,
    Permission,
    QueryAdministratorArgs,
    QueryAdministratorsArgs,
    Success,
} from '@picker-cc/common/lib/generated-types';
import {AdministratorService, UserService} from "../../../service";
import {Ctx} from "../../decorators/request-context.decorator";
import {PaginatedList} from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../common/request-context";
import {Administrator} from "../../../entity/administrator/administrator.entity";
import {Allow} from "../../decorators/allow.decorator";
import { User } from '../../../entity';

@Resolver('Administrator')
export class AdministratorResolver {
  constructor(
    private administratorService: AdministratorService,
  ) {
  }
  @Query()
  @Allow(Permission.ReadAdministrator)
  async administrators(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryAdministratorsArgs,
  ): Promise<PaginatedList<Administrator>> {
    // return this.administratorService.findAll(ctx, args.options || undefined);
      const data = await this.administratorService.findAll(ctx, args.options);
      // console.log(data)
      return data
    // const list =  await this.administratorService.findAll(ctx, args.options);
    // console.log(list.items[0].user)
    //   console.log(list)
    // return list;
  }

  @Query()
  // @Allow(Permission.ReadAdministrator)
  async administrator(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryAdministratorArgs,
  ): Promise<Administrator | undefined> {
    // const user =  await this.administratorService.findOne(ctx, args.id);
    // console.log(JSON.stringify(user))
    //   return JSON.parse(JSON.stringify(user)) as Administrator
    //   const admistartor = new Administrator({
    //       createdAt: new Date(), updatedAt: new Date(), name : 'lala', emailAddress: 'baisheng@gmail.com',
    //       user: new User({identifier: "ttttt"})
    //   })
      // console.log(admistartor)
      return this.administratorService.findOne(ctx, args.id)
      // return admistartor
  }

  @Query()
  @Allow(Permission.Owner)
  async activeAdministrator(@Ctx() ctx: RequestContext): Promise<Administrator | undefined> {
    if (ctx.activeUserId) {
      return this.administratorService.findOneByUserId(ctx, ctx.activeUserId);
    }
  }

  // @Mutation()
  // @Allow(Permission.CreateAdministrator)
  // createCsmAdministrator(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: MutationCreateAdministratorArgs,
  // ): Promise<Administrator> {
  //   const { input } = args;
  //   return this.administratorService.create(ctx, input, UserRoleType.ROLE_ADMIN);
  // }

  @Mutation()
  // @Allow(Permission.CreateAdministrator)
  createAdministrator(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationCreateAdministratorArgs,
  ): Promise<Administrator> {
      // console.log(args)
    const { input } = args;
    return this.administratorService.create(ctx, input);
  }

  @Mutation()
  @Allow(Permission.UpdateAdministrator)
  updateAdministrator(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationUpdateAdministratorArgs,
  ): Promise<Administrator> {
    const { input } = args;
    return this.administratorService.update(ctx, input);
  }

  // @Mutation()
  // @Allow(Permission.Owner)
  // async updateActiveAdministrator(
  //     @Ctx() ctx: RequestContext,
  //     @Args() args: MutationUpdateActiveAdministratorArgs,
  // ): Promise<Administrator | undefined> {
  //     if (ctx.activeUserId) {
  //         const { input } = args;
  //         const administrator = await this.administratorService.findOneByUserId(ctx, ctx.activeUserId);
  //         if (administrator) {
  //             return this.administratorService.update(ctx, { ...input, id: administrator.id });
  //         }
  //     }
  // }
  //
  // @Mutation()
  // @Allow(Permission.UpdateAdministrator)
  // assignRoleToAdministrator(
  //     @Ctx() ctx: RequestContext,
  //     @Args() args: MutationAssignRoleToAdministratorArgs,
  // ): Promise<Administrator> {
  //     return this.administratorService.assignRole(ctx, args.administratorId, args.roleId);
  // }
  //
  @Mutation()
  @Allow(Permission.DeleteAdministrator)
  deleteAdministrator(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationDeleteAdministratorArgs,
  ): Promise<DeletionResponse> {
    const { id } = args;
    return this.administratorService.softDelete(ctx, id);
  }

  /**
   * 启/禁 管理员账户
   * @param ctx
   * @param args
   */
  // @Mutation()
  // async enabledAdministrator(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: MutationEnabledAdministratorArgs,
  // ): Promise<Success> {
  //   return await this.userService.enabledUser(ctx, args.id, args.enabled);
  // }
}
