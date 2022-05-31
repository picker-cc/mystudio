import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { PaginatedList } from '@picker-cc/common/lib/shared-types';

import { Ctx } from '../..';
import { RequestContext } from '../..';
import { MutationCreateAssetsArgs, Permission, QueryAssetArgs, QueryAssetsArgs } from '@picker-cc/common/lib/generated-types';
import {AssetService} from "../../../service";
import {Allow} from "../../decorators/allow.decorator";
import {Asset} from "../../../entity";
import {PaginatedList} from "@picker-cc/common/lib/shared-types";

@Resolver('Asset')
export class AssetResolver {
  constructor(private assetService: AssetService) {
  }

  @Query()
  @Allow(Permission.ReadCatalog)
  async asset(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryAssetArgs,
  ): Promise<Asset | undefined> {
    return this.assetService.findOne(ctx, args.id);
  }

  @Query()
  @Allow(Permission.ReadCatalog)
  async assets(
    @Ctx()ctx: RequestContext,
    @Args() args: QueryAssetsArgs): Promise<PaginatedList<Asset>> {
    // return this.assetService.findAll(args.options || undefined);
    return this.assetService.findAll(ctx, args.options);
  }

  @Mutation()
  // @Allow(Permission.CreateCatalog)
  async createAssets(
      @Ctx() ctx: RequestContext,
      @Args() args: MutationCreateAssetsArgs): Promise<Asset[]> {
    // TODO: Is there some way to parellelize this while still preserving
    // the order of files in the upload? Non-deterministic IDs mess up the e2e test snapshots.
    const assets: Asset[] = [];
    // Logger.info(args.input.length.toString());
    for (const input of args.input) {
      const asset = await this.assetService.create(ctx, input);
      assets.push(asset);
    }
    return assets;
  }

  // @Mutation()
  // @Allow(Permission.UpdateCatalog)
  // async updateAsset(@Ctx() ctx: RequestContext, @Args() { input }: MutationUpdateAssetArgs) {
  //   return this.assetService.update(ctx, input);
  // }
}
