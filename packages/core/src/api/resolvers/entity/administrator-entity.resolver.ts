import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {Ctx} from "../../decorators/request-context.decorator";
import {RequestContext} from "../../common/request-context";
import {Administrator, User} from "../../../entity";
import {EntityNotFoundError} from "../../../common";


@Resolver('Administrator')
export class AdministratorEntityResolver {

    // @ResolveField()
    async user(@Ctx() ctx: RequestContext, @Parent() administrator: Administrator): Promise<User> {
        // if (administrator.user) {
        //     return administrator.user;
        // }
        // const user = await this.userService.getUserByEmailAddress(ctx, administrator.emailAddress);
        // if (!user) {
        //     throw new EntityNotFoundError('User', '<not found>');
        // }
        return null;
    }
}
