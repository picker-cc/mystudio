import {DynamicModule, Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ConfigModule, ConfigService} from "../config";
import {ConnectionOptions, MikroORMOptions} from "@mikro-orm/core";
let defaultMikroOrmModule: DynamicModule;

@Module({
    imports: [ConfigModule]
})
export class ConnectionModule {
    static forRoot(): DynamicModule {
        if (!defaultMikroOrmModule) {
            defaultMikroOrmModule = MikroOrmModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => {
                    const { dbConnectionOptions } = configService;
                    return {
                        ...dbConnectionOptions
                        // ...configService.dbConnectionOptions,
                    }
                },
                inject: [ConfigService]
            })
        }
        return {
            module: ConnectionModule,
            imports: [defaultMikroOrmModule]
        }
    }

    static forPlugin(): DynamicModule {
        return {
            module: ConnectionModule,
            imports: [MikroOrmModule.forFeature([])],
        }
    }
    static getOrmLogger(dbConnectionOptions: MikroORMOptions) {
        if (!dbConnectionOptions.logger) {
            // return new MikroOrmLo
        }
    }
}
