import {Module} from '@nestjs/common';

import {CacheModule} from '../cache/cache.module';
import {ConfigModule} from '../config/config.module';
import {ConnectionModule} from '../connection/connection.module';
// import { JobQueueModule } from '../job-queue/job-queue.module';

import {IdCodecService} from './common/id-codec.service';
import {ServiceModule} from "../service/service.module";
import {AdministratorEntityResolver} from "./resolvers/entity/administrator-entity.resolver";
import {AssetResolver} from "./resolvers/admin/asset.resolver";
import {AdministratorResolver} from "./resolvers/admin/administrator.resolver";
import {TermResolver} from "./resolvers/admin/term.resolver";
import {ProductResolver} from "./resolvers/admin/product.resolver";
import {createDynamicGraphQlModulesForPlugins} from "../plugin/dynamic-plugin-api.module";
import {AuthResolver} from "./resolvers/admin/auth.resolver";

const sharedResolvers = [
    AssetResolver,
    // AssetResolver,
    // SharedResolver,
    // UserFileResolver,
];
const adminResolvers = [
    AdministratorResolver,
    AssetResolver,
    AuthResolver,
    TermResolver,
    ProductResolver,
];

const studioResolvers = [];

export const entityResolvers = [
    AdministratorEntityResolver,
];

export const adminEntityResolvers = [];

/**
 * 包含多个 API 模块使用的共享 providers 的内部模块，
 * 用于业务分层处理
 */
@Module({
    imports: [ ConfigModule, ServiceModule, CacheModule, ConnectionModule.forRoot() ],
    providers: [ IdCodecService, ],
    exports: [
        IdCodecService,
        CacheModule,
        ConfigModule,
        ServiceModule,
        ConnectionModule.forRoot(),
    ],
})
export class ApiSharedModule {
}

/**
 * 包含管理 GraphQL API 解析器的内部模块
 */
@Module({
    imports: [
        ApiSharedModule,
        // JobQueueModule,
        ...createDynamicGraphQlModulesForPlugins('admin'),
    ],
    providers: [ ...adminResolvers, ...entityResolvers, ...adminEntityResolvers ],
    exports: [ ...adminResolvers ],
})
export class AdminApiModule {
}


/**
 * 包含Studio GraphQL API解析器的内部模块
 */
@Module({
    imports: [
        ApiSharedModule,
        ...createDynamicGraphQlModulesForPlugins('studio')
    ],
    providers: [ ...studioResolvers, ...entityResolvers ],
    exports: [ ...studioResolvers ]
})
export class StudioApiModule {
}
