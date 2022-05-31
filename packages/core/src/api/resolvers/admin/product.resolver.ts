import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {
    MutationCreateProductArgs,
    Permission,
    QueryTermsArgs,
} from '@picker-cc/common/lib/generated-types';
import { ListQueryBuilder, ProductService } from "../../../service";
import {Ctx} from "../../decorators/request-context.decorator";
import {PaginatedList} from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../common/request-context";
import {Allow} from "../../decorators/allow.decorator";
import {Product} from "../../../entity";

@Resolver('Product')
export class ProductResolver {
    constructor(
        private productService: ProductService,
        private listQueryBuilder: ListQueryBuilder,
    ) {
    }

    @Query()
    @Allow(Permission.ReadAdministrator)
    async products(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryTermsArgs,
    ): Promise<PaginatedList<Product>> {
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
        const data = await this.productService.findAll(ctx, args.options)
        // console.log(data)
        return data
    }


    @Mutation()
    @Allow(Permission.CreateCatalog, Permission.CreateProduct)
    createProduct(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateProductArgs
    ): Promise<Product> {
        // console.log(ctx)
        const { input } = args
        return this.productService.createProduct(ctx, input);
    }

}
