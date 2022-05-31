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

import {
    InvalidCredentialsError,
    PasswordResetTokenExpiredError,
    PasswordResetTokenInvalidError, PasswordValidationError,
} from "../../common/error/generated-graphql-admin-errors";
import {User} from "../../entity";
import {FilterQuery} from "@mikro-orm/core";
import {ID, PaginatedList} from "@picker-cc/common/lib/shared-types";
import {EntityNotFoundError, ListQueryOptions} from "../../common";
import {CreateTermInput, DeletionResult} from "@picker-cc/common/lib/generated-types";
import {NativeAuthenticationMethod} from "../../entity/authentication-method";
import {Term} from "../../entity/taxonomy/term.entity";

@Injectable()
export class TermService {
    constructor(
        private readonly em: EntityManager,
        private readonly configService: ConfigService,
        private listQueryBuilder: ListQueryBuilder,
        private readonly authService: AuthZRBACService,
        private passwordCipher: PasswordCipher,
        private verificationTokenGenerator: VerificationTokenGenerator,
        private readonly eventBus: EventBus,
        private readonly assetService: AssetService,
    ) {
    }


    async getUserById(userId: ID): Promise<User | undefined> {
        // return this.em.getRepository(User).findOne({
        //   id: userId,
        // }, [ 'roles', 'authenticationMethods' ]);
        return this.em.getRepository(User).findOne({
            id: userId,
        });
    }


    async getUserByEmailAddress(ctx: RequestContext, emailAddress: string): Promise<User | undefined> {
        return this.em.getRepository(User).findOne({
            identifier: emailAddress,
            deletedAt: null,
        });
    }

    async getUserByIdentifier(ctx: RequestContext, identifier: string): Promise<User | undefined> {
        return this.em.getRepository(User).findOne({
            identifier,
            deletedAt: null,
        });
    }


    async createAdminUser(ctx: RequestContext, identifier: string, password: string): Promise<User> {
        const adminUser = new User({
            identifier,
            verified: true,
            authenticationMethods: []
        })
        adminUser.authenticationMethods.push(new NativeAuthenticationMethod({
            passwordHash: await this.passwordCipher.hash(password)
        }))

        await this.em.persistAndFlush(adminUser);

        return adminUser
    }

    /**
     * 创建分类法
     * @param ctx
     * @param input
     */
    async createTerm(ctx: RequestContext, input: CreateTermInput): Promise<Term> {
        const term = new Term(input);
        await this.em.persistAndFlush(term)
        return term
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
