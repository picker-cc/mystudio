import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {
    CreatePostResult, DeletionResponse,
    MutationCreatePostArgs,
    MutationDeletePostArgs,
    MutationUpdatePostArgs,
    Permission,
    QueryPostsArgs,
    UpdatePostResult,
} from '@picker-cc/common/lib/generated-types';

import {Ctx} from "../../decorators/request-context.decorator";
import {PaginatedList} from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../common/request-context";
import {Allow} from "../../decorators/allow.decorator";
import {PostService} from '../../../service/services/post.service';
import {Post} from "../../../entity";
import {ErrorResultUnion} from "../../../common";

@Resolver('Post')
export class PostResolver {
    constructor(
        private postService: PostService,
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
    ): Promise<ErrorResultUnion<CreatePostResult, Post>> {
        const {input} = args
        return this.postService.create(ctx, input)
    }

    @Mutation()
    @Allow(Permission.UpdateCatalog, Permission.UpdatePost)
    async updatePost(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdatePostArgs
    ): Promise<ErrorResultUnion<UpdatePostResult, Post>> {
        const {input} = args
        return this.postService.update(ctx, input)
    }

    @Mutation()
    @Allow(Permission.DeleteCatalog, Permission.DeletePost)
    async deletePost(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationDeletePostArgs
    ): Promise<DeletionResponse> {
        const {id} = args
        return this.postService.softDelete(ctx, id);
    }

//
}
