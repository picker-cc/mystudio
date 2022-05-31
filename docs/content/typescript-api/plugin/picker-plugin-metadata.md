---
date: 2022-04-27T09:22:19.070Z
title: "PickerPluginMetadata"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# PickerPluginMetadata


# PickerPluginMetadata

{% generationInfo "packages/core/src/plugin/picker-plugin.ts", "22", "@vendure/core" %}{% endgenerationInfo %}

定义 Picker 插件的元数据。这个接口是 [Nestjs ModuleMetadata](https://docs.nestjs.com/modules)
（它允许定义 `imports`，`exports`，`providers`和`controllers`）的一个超集，这意味着任何 Nestjs 模块
都是一个有效的 Picker 插件。此外，PickerPluginMetadata 允许定义特定于 Picker 的额外属性。

## Signature

```typescript
interface PickerPluginMetadata extends ModuleMetadata {
  configuration?: PluginConfigurationFn;
  adminApiExtensions?: APIExtensionDefinition;
  entities?: Array<Type<any>> | (() => Array<Type<any>>);
}
```
## Extends

 * ModuleMetadata


## Members

### configuration

{% memberInfo "property", "PluginConfigurationFn", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}

### adminApiExtensions

{% memberInfo "property", "APIExtensionDefinition", '' %}{% endmemberInfo %}

{% memberDescription %}

            插件可以通过提供扩展的模式定义和任何必需的解析器来扩展默认的 Picker GraphQL 管理 api。

{% endmemberDescription %}

### entities

{% memberInfo "property", "Array&#60;Type&#60;any&#62;&#62; | (() =&#62; Array&#60;Type&#60;any&#62;&#62;)", '' %}{% endmemberInfo %}

{% memberDescription %}

            插件可以定义自定义的 entities

{% endmemberDescription %}




# PluginConfigurationFn

{% generationInfo "packages/core/src/plugin/picker-plugin.ts", "76", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
type PluginConfigurationFn = (
    config: RuntimePickerConfig,
) => RuntimePickerConfig | Promise<RuntimePickerConfig>
```
