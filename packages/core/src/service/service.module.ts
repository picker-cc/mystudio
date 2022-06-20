import {Module, OnModuleInit} from '@nestjs/common';

import {CacheModule} from '../cache/cache.module';
import {ConfigModule} from '../config/config.module';
import {ConnectionModule} from '../connection/connection.module';
import {EventBusModule} from '../event-bus/event-bus.module';
// import { JobQueueModule } from '../job-queue/job-queue.module';
import {PasswordCipher} from "./helpers/password-cipher/password-cipher";
import {ListQueryBuilder} from "./helpers/list-query-builder/list-query-builder";
import {VerificationTokenGenerator} from "./helpers/verification-token-generator";
import { InitializerService } from './initializer.service';
import {AdministratorService} from "./services/administrator.service";
import {AssetService} from "./services/asset.service";
import {ConfigService} from "../config";
import {UserService} from './services/user.service';
import {AUTHZ_ENFORCER, AuthZModule} from "nest-authz";
import {join} from "path";
import * as casbin from "casbin";
import {TermService} from "./services/term.service";
import {ProductService} from "./services/product.service";
import {AuthService} from "./services/auth.service";
import {SessionService} from "./services/session.service";
import {NativeAuthenticationStrategy} from "../config/auth/native-authentication-strategy";
import { RoleService } from './services/role.service';


const services = [
    AdministratorService,
    AssetService,
    ConfigService,
    UserService,
    SessionService,
    TermService,
    ProductService,
    AuthService,
    RoleService,
];

const helpers = [
    PasswordCipher,
    ListQueryBuilder,
    VerificationTokenGenerator,
    NativeAuthenticationStrategy,
]

/**
 * ServiceCoreModule 是由 ServiceModule 内部导入的。这样的安排使得该模块只有一个实例被实例化，
 * 因此生命周期的钩子只运行一次。
 */
@Module({
    // imports: [ConnectionModule, ConfigModule, EventBusModule, CacheModule, JobQueueModule],
    imports: [
        ConnectionModule,
        ConfigModule,
        EventBusModule,
        CacheModule,
        AuthZModule.register({
            imports: [ ConfigModule ],
            // model: 'model.conf',
            // policy: MikroORMAdapter.newAdapter({
            //     type: 'mongo',
            //     clientUrl: 'mongodb://localhost:27017/picker?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
            //     dbName: 'picker',
            // }),
            enforcerProvider: {
                provide: AUTHZ_ENFORCER,
                useFactory: async (configService: ConfigService) => {
                    // const config = await configService.getAuthConfig()
                    const model = join(__dirname, './model.conf')
                    return casbin.newEnforcer(model)
                },
                inject: [ ConfigService ]
            },
            usernameFromContext: (ctx) => {
                const request = ctx.switchToHttp().getRequest();
                return request.user && request.user.username;
            }
        }),
    ],
    // providers: [...services, ...helpers, InitializerService],
    providers: [ ...services, ...helpers ],
    exports: [ ...services, ...helpers ],
})
export class ServiceCoreModule implements OnModuleInit {
    constructor(
        private roleService: RoleService,
        private administratorService: AdministratorService,
    ) {
    }
    async onModuleInit() {
        // await this.roleService.initRoles();
        // await this.administratorService.initAdministrators();
    }
}

/**
 * ServiceModule 负责服务层，即访问数据库和实现应用程序的主要业务逻辑。
 * 导出的 providers 在 ApiModule 中使用，ApiModule 负责将请求解析为适合服务层逻辑的格式。
 */
@Module({
    imports: [ ServiceCoreModule ],
    exports: [ ServiceCoreModule ],
})
export class ServiceModule {
}
