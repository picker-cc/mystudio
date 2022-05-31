import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {UserService} from "../../../service/services/user.service";
import {ConfigService} from "../../../config";
import {AdministratorService} from "../../../service/services/administrator.service";

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private administratorService: AdministratorService,
  ) {
  }

  /*  @Mutation()
    // @Allow(Permission.Public)
    createUsersForCompany(
      @Args() args: MutationCreateUsersForCompanyArgs,
      @Ctx() ctx: RequestContext,
    ): Promise<String[]> {
      return String[''];
      // return this.userService.batchCreateUser(args.input);
    }*/

  // @Mutation()
  // createCustomer(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: MutationCreateCustomerArgs
  // ): Promise<Customer> {
  //   return this.userService.createCustomerUser(ctx, args.input);
  // }

  /**
   * 创建用户
   * @param ctx
   * @param args
   */
  // @Mutation()
  // createUser(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: MutationCreateCsmUserArgs
  // ): Promise<User> {
  //   return this.userService.createCsmUser(ctx, args.input);
  // }

  // customers()
  // @Query()
  // users(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: QueryUsersArgs
  // ): Promise<PaginatedList<User>> {
  //   return this.userService.findAll(ctx, args.options)
  // }

}
