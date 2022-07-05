import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {
    MutationCreatePostArgs,
    MutationCreateProductArgs, MutationUpdatePostArgs,
    Permission, QueryPostsArgs,
    QueryTermsArgs,
} from '@picker-cc/common/lib/generated-types';
import { ListQueryBuilder, ProductService } from "../../../service";
import {Ctx} from "../../decorators/request-context.decorator";
import {PaginatedList} from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../common/request-context";
import {Allow} from "../../decorators/allow.decorator";
import { PostService } from '../../../service/services/post.service';
import {Post} from "../../../entity";

@Resolver('Post')
export class PostResolver {
    constructor(
        private postService: PostService,
        private listQueryBuilder: ListQueryBuilder,
    ) {
    }

    @Query()
    @Allow(Permission.ReadAdministrator)
    async posts(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryPostsArgs,
    ): Promise<PaginatedList<Post>> {
        return this.postService.findAll(ctx, args.options)
    }


    @Mutation()
    @Allow(Permission.CreateCatalog, Permission.CreatePost)
    async createPost(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreatePostArgs
    ): Promise<Post> {
        const { input } = args
        return this.postService.create(ctx, input)
    }

    // async updatePost(
    //    @Ctx() ctx: RequestContext,
    //    @Args() args: MutationUpdatePostArgs
    // ): Promise<Post> {
        // const { input } = args
        // return this.postService.
    // }
//

}
