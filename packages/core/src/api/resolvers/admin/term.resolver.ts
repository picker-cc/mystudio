import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {
    CreateTermResult,
    MutationCreateTermArgs, MutationUpdateTermArgs,
    Permission,
    QueryTermsArgs, UpdateTermResult,
} from '@picker-cc/common/lib/generated-types';
import {AdministratorService, ListQueryBuilder, UserService} from "../../../service";
import {Ctx} from "../../decorators/request-context.decorator";
import {PaginatedList} from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../common/request-context";
import {Administrator} from "../../../entity/administrator/administrator.entity";
import {Allow} from "../../decorators/allow.decorator";
import {User} from '../../../entity';
import {TermService} from "../../../service/services/term.service";
import {Term} from "../../../entity/taxonomy/term.entity";
import {ErrorResultUnion} from "../../../common";

@Resolver('Term')
export class TermResolver {
    constructor(
        private termService: TermService,
    ) {
    }

    @Query()
    @Allow(Permission.ReadAdministrator)
    async terms(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryTermsArgs,
    ): Promise<PaginatedList<Term>> {
        return await this.termService.findAll(ctx, args.options)
    }


    @Mutation()
    createTerm(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateTermArgs
    ): Promise<ErrorResultUnion<CreateTermResult, Term>> {
        const { input } = args
        return this.termService.create(ctx, input);
    }

    @Mutation()
    updateTerm(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateTermArgs
    ): Promise<ErrorResultUnion<UpdateTermResult, Term>> {
        const { input } = args
        return this.termService.update(ctx, input)
    }
}
