import {Injectable, OnModuleInit} from "@nestjs/common";
import {EntityManager} from "@mikro-orm/mongodb";
import {ConfigService} from "../../config";
import {AssetService} from "./asset.service";
import {EventBus} from "../../event-bus";
import {RequestContext} from '../../api';
import {ListQueryBuilder, parseFilterParams} from "../helpers/list-query-builder/list-query-builder";
import slug from 'limax';
import {ID, PaginatedList} from "@picker-cc/common/lib/shared-types";
import {EntityNotFoundError, ListQueryOptions} from "../../common";
import {
    CreatePostInput,
    CreateProductInput,
    CreateTermInput,
    DeletionResult, UpdatePostInput
} from "@picker-cc/common/lib/generated-types";
import { Post } from "../../entity/posts/post.entity";
import { User } from "../../entity/user/user.entity";
import { Term } from "../../entity/taxonomy/term.entity";
import { Asset } from "../../entity/asset/asset.entity";
import {PostEvent} from "../../event-bus/events/post-event";
import {wrap} from "@mikro-orm/core";

@Injectable()
export class PostService {
    constructor(
        private readonly em: EntityManager,
        private readonly configService: ConfigService,
        private listQueryBuilder: ListQueryBuilder,
        private readonly eventBus: EventBus,
        private readonly assetService: AssetService,
    ) {
    }

    /**
     * 创建一个内容
     * @param ctx
     * @param input
     */
    async create(ctx: RequestContext, input: CreatePostInput): Promise<Post> {
        const post = new Post({
            title: input.title,
            slug: slug(input.title),
            type: input.type,
            content: input.content,
            creator: ctx.session.user
            // terms: input.ter
        })
        // console.log(post)
        // return null;
        //
        if (input.terms && input.terms.length > 0) {
            const terms: Term[] = []
            for (const termId of input.terms) {
                terms.push(new Term({id: termId}))
            }
            post.terms = terms
        }
        // if (input.assetIds && input.assetIds.length > 0) {
        //     for (const id of input.assetIds) {
        //         post.assets.add(new Asset({id}))
        //     }
        // }

        await this.em.persistAndFlush(post)
        return post;
    }

    // async update(ctx: )

    /**
     * 查询全部内容
     * @param ctx
     * @param options
     */
    async findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Post>
    ): Promise<PaginatedList<Post>> {
        return this.listQueryBuilder.build(Post, options, {
            populate: [ 'featured' ] as any
        }).then(([ items, totalItems ]) => ({
            items,
            totalItems
        }))
    }

    async update(ctx: RequestContext, input: Partial<UpdatePostInput>): Promise<Post> {
        const post = await this.em.findOneOrFail(Post, {id: input.id});
        // if (input.featuredId) {
        // }
        if (input.terms && input.terms.length > 0) {
            const terms: Term[] = []
            for (const termId of input.terms) {
                terms.push(new Term({id: termId}))
            }
            post.terms = terms
        }
        wrap(post).assign({
            allowComment: input.allowComment,
            content: input.content,
            creator: input.creatorId.toString() !== post.creator.id.toString() && new User({id: input.creatorId}),
            featured: input.featuredId && new Asset({id: input.featuredId}),
            order: input.order,
            parent: input.parent,
            state: input.state,
            title: input.title,
            type: input.type
        }, {merge: true})
        await this.em.persistAndFlush(post)
        this.eventBus.publish(new PostEvent(ctx, post, 'created', input))
        return post
    }
    /**
     * 逻辑删除
     * @param ctx
     * @param productId
     */
    async softDelete(ctx: RequestContext, postId: ID) {
        await this.em.findOneOrFail(Post, {id: postId});
        await this.em.nativeUpdate(Post, {id: postId}, {deletedAt: new Date()});
        return {
            result: DeletionResult.DELETED,
        };
    }


}
