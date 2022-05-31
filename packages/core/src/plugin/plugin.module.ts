import { DynamicModule, Module } from '@nestjs/common';

import { getConfig } from '../config/config-helpers';
import { ConfigModule } from '../config/config.module';

import { getModuleMetadata } from './plugin-metadata';

/**
 * 这个模块收集并重新导出插件中定义的所有的 providers，这样它们就可以在其他模块中使用。
 */
@Module({
    imports: [ConfigModule],
})
export class PluginModule {
    static forRoot(): DynamicModule {
        return {
            module: PluginModule,
            imports: [...getConfig().plugins],
        };
    }
}
