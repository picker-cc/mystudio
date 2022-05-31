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
import {CreateProductInput, CreateTermInput, DeletionResult} from "@picker-cc/common/lib/generated-types";
import {Product} from "../../entity/product/product.entity";
import {Asset} from "../../../dist/entity/asset/asset.entity";

@Injectable()
export class ProductService {
    constructor(
        private readonly em: EntityManager,
        private readonly configService: ConfigService,
        private listQueryBuilder: ListQueryBuilder,
        private readonly eventBus: EventBus,
        private readonly assetService: AssetService,
    ) {
    }

    /**
     * 创建一个作品
     * @param ctx
     * @param input
     */
    async createProduct(ctx: RequestContext, input: CreateProductInput): Promise<Product> {
        const product = new Product({
            // creator: ctx.activeUser,
            slug: slug(input.title),
            type: input.type,
            title: input.title,
            publicly: input.publicly,
            content: input.content,
            featured: input.featuredId && new Asset({id: input.featuredId}),
            setting: {
                diffPrice: input.setting?.diffPrice && input.setting.diffPrice,
                price: input.setting?.price && input.setting.price,
                subscription: input.setting?.subscription && input.setting.subscription,
                protect: input.setting?.protect && input.setting.protect,
            },
            enabled: true,
            state: input.state,
        })

        if (input.assetIds && input.assetIds.length > 0) {
            for (const id of input.assetIds) {
                product.assets.add(new Asset({id}))
            }
        }

        await this.em.persistAndFlush(product)
        return product;
    }

    /**
     * 查询全部作品
     * @param ctx
     * @param options
     */
    async findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Product>
    ): Promise<PaginatedList<Product>> {
        return this.listQueryBuilder.build(Product, options, {
            populate: [ 'featured' ] as any
        }).then(([ items, totalItems ]) => ({
            items,
            totalItems
        }))
    }

    /**
     * 逻辑删除
     * @param ctx
     * @param productId
     */
    async softDelete(ctx: RequestContext, productId: ID) {
        await this.em.findOneOrFail(Product, {id: productId});
        await this.em.nativeUpdate(Product, {id: productId}, {deletedAt: new Date()});
        return {
            result: DeletionResult.DELETED,
        };
    }


}
