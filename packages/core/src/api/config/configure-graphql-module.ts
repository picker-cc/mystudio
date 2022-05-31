import {DynamicModule} from "@nestjs/common";
import {ConfigModule, ConfigService} from "../../config";
import {buildSchema, extendSchema, GraphQLSchema, printSchema, ValidationContext } from "graphql";
// import {I18nService} from "../../i18n";
import {IdCodecService} from "../common/id-codec.service";
import {ApiType} from "../common/get-api-type";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import path from "path";
// import {getPluginAPIExtensions} from "../../plugin/plugin-metadata";
// import {notNullOrUndefined} from "@picker-cc/common/lib/shared-utils";
import {generateListOptions} from "./generate-list-options";
// import {addActiveAdministratorCustomFields, addServerConfigCustomFields} from "./graphql-custom-fields";
// import {I18nModule} from "../../i18n/i18n.module";
import {ApiSharedModule} from "../api-internal-modules";
import {ServiceModule} from "../../service/service.module";
import {generateResolvers} from "./generate-resolvers";
import {generatePermissionEnum} from "./generate-permission";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GqlModuleOptions, GraphQLModule, GraphQLTypesLoader} from "@nestjs/graphql";
import { I18nService } from '../../i18n/i18n.service';
import {I18nModule} from "../../i18n/i18n.module";
import {TranslateErrorsPlugin} from "../middleware/translate-errors-plugin";
import {AssetInterceptorPlugin} from "../middleware/asset-interceptor-plugin";

export interface GraphQLApiOptions {
    apiType: 'studio' | 'admin';
    typePaths: string[];
    apiPath: string;
    debug: boolean;
    playground: boolean | any;
    // tslint:disable-next-line:ban-types
    resolverModule: Function;
    validationRules: Array<(context: ValidationContext) => any>;
}

export function configureGraphQLModule(
    getOptions: (configService: ConfigService) => GraphQLApiOptions
): DynamicModule {
    return GraphQLModule.forRootAsync<ApolloDriverConfig>({
        driver: ApolloDriver,
        useFactory: (
            configService: ConfigService,
            i18nService: I18nService,
            // idCodecService: IdCodecService,
            typesLoader: GraphQLTypesLoader,
            // customFieldRelationResolverService: CustomFieldRe
        ) => {
            // const options = getOptions(configService);

            return createGraphQLOptions(
                configService,
                i18nService,
                // idCodecService,
                typesLoader,
                // customFieldRelationResolverService,
                getOptions(configService),
                // options,
            );
        },
        inject: [
            ConfigService,
            I18nService,
            // IdCodecService,
            GraphQLTypesLoader,
        ],
        imports: [
            ConfigModule,
            I18nModule,
            ApiSharedModule,
            ServiceModule
        ],
    })
}

async function createGraphQLOptions(
    configService: ConfigService,
    i18nService: I18nService,
    // idCodecService: IdCodecService,
    typesLoader: GraphQLTypesLoader,
    options: GraphQLApiOptions,
): Promise<GqlModuleOptions> {

    const builtSchema = await buildSchemaForApi(options.apiType);
    const resolvers = generateResolvers(
        configService,
        options.apiType,
        builtSchema,
    );
    return {
        path: '/' + options.apiPath,
        typeDefs: printSchema(builtSchema),
        include: [options.resolverModule],
        fieldResolverEnhancers: [],
        resolvers,
        uploads: false,
        playground: options.playground || false,
        debug: options.debug || false,
        context: (req: any) => {
            // console.log(req)
            return req
        },
        // 这是由Express cors插件处理
        cors: false,
        plugins: [
            new TranslateErrorsPlugin(i18nService),
            // new AssetInterceptorPlugin(configService),
            ...configService.apiOptions.apolloServerPlugins,
        ],
        validationRules: options.validationRules,
        // introspection: true,
        introspection: configService.apiOptions.introspection ?? true,
    } as GqlModuleOptions;

    /**
     * 组合生成服务器的 GraphQL schema
     * 1. 在 `typePaths` 指定的 source .graphql 文件中定义的默认模式
     * 2. 在配置中定义的任何自定义字段
     * 3. 由插件定义的任何模式扩展
     *
     * @param apiType
     */
    async function buildSchemaForApi(apiType: ApiType): Promise<GraphQLSchema> {
        const customFields = configService.customFields;
        // 路径必须规范化以使用正斜杠分隔符。
        // 参考 https://github.com/nestjs/graphql/issues/336
        const normalizedPaths = options.typePaths.map(p => p.split(path.sep).join('/'));
        const typeDefs = await typesLoader.mergeTypesByPaths(normalizedPaths);
        // const authStrategies =
        //     apiType === 'cms'
        //         ? configService.authOptions.adminAuthenticationStrategy
        //         : configService.authOptions.adminAuthenticationStrategy;
        let schema = buildSchema(typeDefs);

        // getPluginAPIExtensions(configService.plugins, apiType)
        //     .map(e => (typeof e.schema === 'function' ? e.schema() : e.schema))
        //     .filter(notNullOrUndefined)
        //     .forEach(documentNode => (schema = extendSchema(schema, documentNode)));

        schema = generateListOptions(schema);
        // schema = generateErrorCodeEnum(schema);

        // schema = addGraphQLCustomFields(schema, customFields, apiType === 'shop');
        // if (apiType === 'admin') {
        //     schema = addServerConfigCustomFields(schema, customFields);
        // }
        schema = generatePermissionEnum(schema, configService.authOptions.customPermissions);

        return schema;
    }
}
