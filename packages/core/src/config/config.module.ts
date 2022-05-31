import {Module, OnApplicationBootstrap, OnApplicationShutdown} from '@nestjs/common';

import {ConfigService} from './config.service';
import {ModuleRef} from "@nestjs/core";
import { Injector } from '../common/injector';

import { InjectableStrategy } from '../common/types/injectable-strategy';

@Module({
  providers: [ ConfigService ],
  exports: [ ConfigService ]
})
export class ConfigModule implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(private configService: ConfigService, private moduleRef: ModuleRef) {}

    async onApplicationBootstrap() {
        await this.initInjectableStrategies();
    }

    async onApplicationShutdown(signal?: string) {
        await this.destroyInjectableStrategies();
    }

    private async initInjectableStrategies() {
        const injector = new Injector(this.moduleRef);
        for (const strategy of this.getInjectableStrategies()) {
            if (typeof strategy.init === 'function') {
                await strategy.init(injector);
            }
        }
    }

    private getInjectableStrategies(): InjectableStrategy[] {
        const { assetNamingStrategy, assetPreviewStrategy, assetStorageStrategy } =
            this.configService.assetOptions;
        const {
            adminAuthenticationStrategy,
            sessionCacheStrategy,
            passwordHashingStrategy,
        } = this.configService.authOptions;
        // const { jobQueueStrategy, jobBufferStorageStrategy } = this.configService.jobQueueOptions;
        const { entityIdStrategy: entityIdStrategyDeprecated } = this.configService;
        // const { entityIdStrategy } = this.configService.entityOptions;
        return [
            ...adminAuthenticationStrategy,
            sessionCacheStrategy,
            passwordHashingStrategy,
            assetNamingStrategy,
            assetPreviewStrategy,
            assetStorageStrategy,
            // jobQueueStrategy,
            // jobBufferStorageStrategy,
            entityIdStrategyDeprecated,
            // ...[entityIdStrategy].filter(notNullOrUndefined),
        ] as any
    }
    private async destroyInjectableStrategies() {
        for (const strategy of this.getInjectableStrategies()) {
            if (typeof strategy.destroy === 'function') {
                await strategy.destroy();
            }
        }
    }

}
