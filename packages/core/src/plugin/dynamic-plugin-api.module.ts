import { Type } from '@picker-cc/common/lib/shared-types';
import { notNullOrUndefined } from '@picker-cc/common/lib/shared-utils';
import { DynamicModule } from '@nestjs/common';

import { ApiType } from '../api';
import { getConfig } from '../config/config-helpers';

import { getModuleMetadata, graphQLResolversFor, isDynamicModule } from './plugin-metadata';

const dynamicApiModuleClassMap: { [name: string]: Type<any> } = {};

/**
 * 这个函数动态地创建一个Nest模块来存放任何已配置插件定义的GraphQL解析器。
 */
export function createDynamicGraphQlModulesForPlugins(apiType: 'studio' | 'admin'): DynamicModule[] {
    return getConfig()
        .plugins.map(plugin => {
            const pluginModule = isDynamicModule(plugin) ? plugin.module : plugin;
            const resolvers = graphQLResolversFor(plugin, apiType) || [];
            if (resolvers.length) {
                const className = dynamicClassName(pluginModule, apiType);
                dynamicApiModuleClassMap[className] = class {};
                Object.defineProperty(dynamicApiModuleClassMap[className], 'name', { value: className });
                const { imports } = getModuleMetadata(pluginModule);
                return {
                    module: dynamicApiModuleClassMap[className],
                    imports: [pluginModule, ...imports],
                    providers: [...resolvers],
                };
            }
        })
        .filter(notNullOrUndefined) as DynamicModule[];
}

/**
 * 这个函数检索使用createDynamicGraphQlModulesForPlugins创建的任何动态模块。
 */
export function getDynamicGraphQlModulesForPlugins(apiType: 'studio' | 'admin'): Array<any>{
    return getConfig()
        .plugins.map(plugin => {
            const pluginModule = isDynamicModule(plugin) ? plugin.module : plugin;
            const resolvers = graphQLResolversFor(plugin, apiType) || [];

            const className = dynamicClassName(pluginModule, apiType);
            // const dynamicApiModule = dynamicApiModuleClassMap[className];
            return dynamicApiModuleClassMap[className];
        })
        .filter(notNullOrUndefined);
}

function dynamicClassName(module: Type<any>, apiType: 'studio' | 'admin'): string {
    return module.name + `Dynamic` + (apiType === 'studio' ? 'Studio' : 'Admin') + 'Module';
}
