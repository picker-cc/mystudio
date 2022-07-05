import {Injectable, OnModuleInit} from "@nestjs/common";
import {EntityManager} from "@mikro-orm/mongodb";
import {ConfigService} from "../../config";
import {AuthZRBACService} from "nest-authz";
import {PasswordCipher} from "../helpers/password-cipher/password-cipher";
import {VerificationTokenGenerator} from "../helpers/verification-token-generator";
import {AssetService} from "./asset.service";
import {EventBus} from "../../event-bus";
import {RequestContext} from '../../api';
import {ListQueryBuilder, parseFilterParams} from "../helpers/list-query-builder/list-query-builder";
import slug from 'limax';

import {
    InvalidCredentialsError, NameConflictError,
    PasswordResetTokenExpiredError,
    PasswordResetTokenInvalidError, PasswordValidationError,
} from "../../common/error/generated-graphql-admin-errors";
import {User} from "../../entity";
import {FilterQuery} from "@mikro-orm/core";
import {ID, PaginatedList} from "@picker-cc/common/lib/shared-types";
import {EntityNotFoundError, ErrorResultUnion, ListQueryOptions} from "../../common";
import {
    CreateTermInput,
    CreateTermResult,
    DeletionResult,
    UpdateTermInput,
    UpdateTermResult
} from "@picker-cc/common/lib/generated-types";
import {NativeAuthenticationMethod} from "../../entity/authentication-method";
import {Term} from "../../entity/taxonomy/term.entity";
import {Asset} from "../../../dist/entity/asset/asset.entity";

@Injectable()
export class TermService {
    constructor(
        private readonly em: EntityManager,
        private readonly configService: ConfigService,
        private listQueryBuilder: ListQueryBuilder,
        private readonly eventBus: EventBus,
        private readonly assetService: AssetService,
    ) {
    }

    /**
     * 创建分类法
     * @param ctx
     * @param input
     */
    async create(
        ctx: RequestContext,
        input: CreateTermInput
    ): Promise<ErrorResultUnion<CreateTermResult, Term>> {
        const existingTerm = await this.em.findOne(Term, {
            $or: [ {
                name: input.name
            }, {
                slug: input.slug
            } ]
        })
        if (existingTerm) {
            return new NameConflictError()
        }
        const term = new Term({
            name: input.name,
            slug: input.slug ? input.slug : slug(input.name),
            taxonomy: input.taxonomy,
        });
        await this.em.persistAndFlush(term)
        return term
    }

    async update(
        ctx: RequestContext,
        input: UpdateTermInput
    ): Promise<ErrorResultUnion<UpdateTermResult, Term>> {
        // const term = await this.em.findOneOrFail(Term, {id: input.id})
        const existingTerm = await this.em.findOne(Term, {
            id: input.id
        })
        if (!existingTerm) {
            // return new EntityNotFoundError()
            throw new EntityNotFoundError(Term.name as any, input.id);
        }
        if (input.name || input.slug) {
            const findTerm = await this.em.findOne(Term, {
                $or: [ {
                    name: input.name
                }, {
                    slug: input.slug
                } ]
            })
            if (findTerm) {
                return new NameConflictError()
            }
        }

        if (input.featuredId) {
            existingTerm.featured = new Asset({id: input.featuredId});
        }
        existingTerm.description = input.description
        existingTerm.name = input.name
        existingTerm.slug = input.slug ? input.slug : slug(input.name)
        existingTerm.taxonomy = input.taxonomy && input.taxonomy
        await this.em.persistAndFlush(existingTerm)
        return existingTerm
    }

    /**
     * 查询全部分类法
     * @param ctx
     * @param options
     */
    async findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Term>
    ): Promise<PaginatedList<Term>> {
        return this.listQueryBuilder.build(Term, options, {
            populate: [ 'featured' ] as any
        }).then(([ items, totalItems ]) => ({
            items,
            totalItems
        }))
    }

    /**
     * 逻辑删除
     * @param ctx
     * @param userId
     */
    async softDelete(ctx: RequestContext, userId: ID) {
        await this.em.findOneOrFail(User, {id: userId});
        await this.em.nativeUpdate(User, {id: userId}, {deletedAt: new Date()});
        return {
            result: DeletionResult.DELETED,
        };
    }


}
