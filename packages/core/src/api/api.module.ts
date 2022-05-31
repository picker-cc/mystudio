import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {join} from 'path';

import {ConfigModule, ConfigService} from "../config";
import {ServiceModule} from "../service/service.module";
import {ConnectionModule} from "../connection/connection.module";
// import {I18nModule} from "../i18n/i18n.module";
import {AdminApiModule, ApiSharedModule, StudioApiModule} from "./api-internal-modules";
import {RequestContextService} from "./common/request-context.service";
import {configureGraphQLModule} from "./config/configure-graphql-module";
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {AuthGuard} from "./middleware/auth-guard";
import {I18nModule} from "../i18n/i18n.module";
import {TranslateErrorResultInterceptor} from "./middleware/translate-error-result-interceptor";
import {ExceptionLoggerFilter} from "./middleware/exception-logger.filter";

@Module({
    imports: [
        // CasbinModule,
        ServiceModule,
        ConnectionModule.forRoot(),
        I18nModule,
        AdminApiModule,
        StudioApiModule,
        ApiSharedModule,
        configureGraphQLModule(configService => ({
            apiType: 'studio',
            apiPath: configService.apiOptions.studioApiPath,
            playground: configService.apiOptions.studioApiPlayground,
            debug: configService.apiOptions.studioApiDebug,
            typePaths: [ 'studio-api', 'common' ].map(p => join(__dirname, 'schema', p, '*.graphql')),
            resolverModule: StudioApiModule,
            validationRules: configService.apiOptions.studioApiValidationRules,
        })),
        configureGraphQLModule(configService => ({
            apiType: 'admin',
            apiPath: configService.apiOptions.adminApiPath,
            playground: configService.apiOptions.adminApiPlayground,
            debug: configService.apiOptions.adminApiDebug,
            typePaths: [ 'admin-api', 'common' ].map(p => join(__dirname, 'schema', p, '*.graphql')),
            resolverModule: AdminApiModule,
            validationRules: configService.apiOptions.adminApiValidationRules,
        })),

    ],
    providers: [
        RequestContextService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TranslateErrorResultInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: ExceptionLoggerFilter,
        }
    ]
})
export class ApiModule implements NestModule {
    constructor(private configService: ConfigService) {
    }

    configure(consumer: MiddlewareConsumer): any {
        // const { adminApiPath } = this.configService.apiOptions;
        // const { uploadMaxFileSize } = this.configService.assetOptions;

        // consumer
        //     .apply(graphqlUploadExpress({ maxFileSize: uploadMaxFileSize }))
        //     .forRoutes(adminApiPath, shopApiPath);
    }
}
