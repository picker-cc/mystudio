import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {
    DeletionResponse,
    MutationCreateAdministratorArgs,
    MutationCreateTermArgs,
    MutationDeleteAdministratorArgs,
    MutationEnabledAdministratorArgs,
    MutationUpdateAdministratorArgs,
    Permission,
    QueryAdministratorArgs,
    QueryAdministratorsArgs,
    QueryTermsArgs,
    Success,
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

@Resolver('Term')
export class TermResolver {
    constructor(
        private termService: TermService,
        private listQueryBuilder: ListQueryBuilder,
    ) {
    }

    @Query()
    @Allow(Permission.ReadAdministrator)
    async terms(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryTermsArgs,
    ): Promise<PaginatedList<Term>> {
        // return this.administratorService.findAll(ctx, args.options || undefined);
        // const list =  await this.administratorService.findAll(ctx, args.options);
        // console.log(list.items[0].user)
        //   console.log(list)
        // return list;
        // return this.listQueryBuilder.build(Term, args.options, {})
        //     .then(([ items, totalItems ]) => ({
        //         items,
        //         totalItems
        //     }))
        const data = await this.termService.findAll(ctx, args.options)
        // console.log(data)
        return data
    }


    @Mutation()
    createTerm(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateTermArgs
    ): Promise<Term> {
        const { input } = args
        return this.termService.createTerm(ctx, input);
    }

}
