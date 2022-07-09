import {Injectable, OnModuleInit} from "@nestjs/common";
import {EntityManager} from "@mikro-orm/mongodb";
import {ConfigService} from "../../config";
import {AssetService} from "./asset.service";
import {EventBus} from "../../event-bus";
import {RequestContext} from '../../api';
import {ListQueryBuilder, parseFilterParams} from "../helpers/list-query-builder/list-query-builder";
import slug from 'limax';
import {ID, PaginatedList} from "@picker-cc/common/lib/shared-types";
import {EntityNotFoundError, ErrorResultUnion, ListQueryOptions} from "../../common";
import {
    CreatePostInput, CreatePostResult,
    CreateTermInput, DeletionResponse,
    DeletionResult, UpdatePostInput, UpdatePostResult
} from "@picker-cc/common/lib/generated-types";
import { Post } from "../../entity/posts/post.entity";
import { Term } from "../../entity/taxonomy/term.entity";
import { Asset } from "../../entity/asset/asset.entity";
import {PostEvent} from "../../event-bus/events/post-event";
import {wrap} from "@mikro-orm/core";
import { SlugConflictError } from "../../common/error/generated-graphql-admin-errors";

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
    async create(ctx: RequestContext, input: CreatePostInput): Promise<ErrorResultUnion<CreatePostResult, Post>> {

        const post = new Post({
            title: input.title,
            slug: input.slug ? input.slug : slug(input.title),
            type: input.type,
            content: input.content,
            creator: ctx.session.user,
            // terms: input.ter
            meta: input.meta,
        })
        // if (input.slug) {
        //     await this.validateSlug(input.slug)
        // }
        // await this.validateSlug(post.slug)
        // const findPost = await this.em.findOne(Post, {slug})
        // console.log(post)
        // return null;
        //
        const findPost = await this.findBySlug(post.slug)
        if (findPost) return new SlugConflictError()

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

    async update(ctx: RequestContext, input: UpdatePostInput): Promise<ErrorResultUnion<UpdatePostResult, Post>> {
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
            creator: ctx.session.user,
            featured: input.featuredId && new Asset({id: input.featuredId}),
            order: input.order,
            parent: input.parent,
            state: input.state,
            title: input.title,
            slug: input.slug ? input.slug : slug(input.title),
            type: input.type
        }, {merge: true})
        const findPost = await this.findBySlug(post.slug)
        if (findPost) return new SlugConflictError()
        await this.em.persistAndFlush(post)
        this.eventBus.publish(new PostEvent(ctx, post, 'created', input))
        return post
    }
    /**
     * 逻辑删除
     * @param ctx
     * @param postId
     */
    async softDelete(ctx: RequestContext, postId: ID): Promise<DeletionResponse> {
        try {
            await this.em.findOneOrFail(Post, {id: postId});

        } catch (e) {
            return {
                result: DeletionResult.NOT_DELETED,
                message: ''
            }
        }
        await this.em.nativeUpdate(Post, {id: postId}, {deletedAt: new Date()});
        return {
            result: DeletionResult.DELETED,
            message: ''
        };
    }


    /**
     * 按 Slug 查询
     * @param slug
     */
    async findBySlug(slug: string):Promise<Post | null> {
        return await this.em.findOne(Post, { slug })
    }
    /**
     * 验证 slug 是否存在
     * @param slug
     */
    async validateSlug(slug: string) {
        // const findPost = await this.em.findOne(Post, {slug})
        // return !!findPost
        // if (findPost) {
        //     throw new SlugConflictError()
            // throw new EntityNotFoundError('User', userId)
        // }
    }
}
