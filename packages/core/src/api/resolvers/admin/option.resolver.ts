import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';

import {  MutationCreateOptionArgs, MutationUpdateOptionArgs } from '@caixie/common/lib/generated-types';
import {OptionService} from "../../../service/services/option.service";
import {RequestContext} from "../../common/request-context";
import {Ctx} from "../../decorators/request-context.decorator";
import {Option} from "../../../entity/option/option.entity";

@Resolver('AdminOptionResolver')
export class OptionResolver {
  constructor(
    private optionService: OptionService,
  ) {
  }
  @Mutation()
  createOption(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationCreateOptionArgs
  ): Promise<Option> {
    return this.optionService.create(ctx, args.input);
  }

  @Mutation()
  updateOption(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationUpdateOptionArgs
  ): Promise<Option> {
    return this.optionService.update(ctx, args.input)
  }
}
