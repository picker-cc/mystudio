---
date: 2022-04-27T09:22:19.071Z
title: "PickerPlugin"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# PickerPlugin


# PickerPlugin

{% generationInfo "packages/core/src/plugin/picker-plugin.ts", "115", "@vendure/core" %}{% endgenerationInfo %}

PickerPlugin 装饰器是一种配置 和/或 扩展 Picker 服务器功能的方法。
Picker 插件是一个 [Nestjs Module](https://docs.nestjs.com/modules)，带有可选的附加元数据，
定义诸如 GraphQL API 扩展之类的东西，自定义配置或新的数据库实体。

除了配置应用程序，插件还可以通过扩展现有类型或添加全新的类型。
还可以定义数据库实体和解析器来处理扩展的 GraphQL schema。

*Example*

typescript
import { Controller, Get } from '@nestjs/common';
import { Ctx, PluginCommonModule, ProductService, RequestContext, PickerPlugin } from '@picker-cc/core';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @Get()
    findAll(@Ctx() ctx: RequestContext) {
        return this.productService.findAll(ctx);
    }
}


//添加用于查询产品的 REST endpoint 的简单插件。
@PickerPlugin({
    imports: [PluginCommonModule],
    controllers: [ProductsController],
})
export class RestPlugin {}
```

## Signature

```typescript
function PickerPlugin(pluginMetadata: PickerPluginMetadata): ClassDecorator
```
## Parameters

### pluginMetadata

