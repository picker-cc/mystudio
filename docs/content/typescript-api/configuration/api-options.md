---
date: 2022-04-27T09:22:19.042Z
title: "ApiOptions"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# ApiOptions


# ApiOptions

{% generationInfo "packages/core/src/config/picker-config.ts", "31", "@vendure/core" %}{% endgenerationInfo %}

ApiOptions定义了如何公开的Picker GraphQL API，以及允许API层与中间件扩展。

## Signature

```typescript
interface ApiOptions {
  hostname?: string;
  port: number;
  adminApiPath?: string;
  adminApiPlayground?: boolean | any;
  adminApiDebug?: boolean;
  adminListQueryLimit?: number;
  adminApiValidationRules?: Array<(context: ValidationContext) => any>;
  cors?: boolean | CorsOptions;
  middleware?: Middleware[];
  apolloServerPlugins?: PluginDefinition[];
}
```
## Members

### hostname

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            设置服务器主机名。如果没有设置，则使用 localhost

{% endmemberDescription %}

### port

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            Picker服务器应该监听哪个端口。

{% endmemberDescription %}

### adminApiPath

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            Admin GraphQL API 的路径。

{% endmemberDescription %}

### adminApiPlayground

{% memberInfo "property", "boolean | any", '' %}{% endmemberInfo %}

{% memberDescription %}

            是否开启 Admin GraphQL API playground
[ApolloServer playground](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructoroptions-apolloserver).

{% endmemberDescription %}

### adminApiDebug

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            是否开启 Admin GraphQL API Debug
[ApolloServer playground](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructoroptions-apolloserver).

{% endmemberDescription %}

### adminListQueryLimit

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            返回 `PaginatedList` 响应的查询可能返回的最大条目数。换句话说，这是 `take` 输入选项的上限。

{% endmemberDescription %}

### adminApiValidationRules

{% memberInfo "property", "Array&#60;(context: ValidationContext) =&#62; any&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            在验证管理GraphQL API的模式时，使用作为额外验证规则的自定义函数
[ApolloServer validation rules](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#validationrules).

{% endmemberDescription %}

### cors

{% memberInfo "property", "boolean | CorsOptions", '' %}{% endmemberInfo %}

{% memberDescription %}

            是否开启Server CORS 跨域。
详见：[express CORS docs](https://github.com/expressjs/cors#configuration-options)

{% endmemberDescription %}

### middleware

{% memberInfo "property", "Middleware[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            自定义的Express 或 NestJS 中间件

{% endmemberDescription %}

### apolloServerPlugins

{% memberInfo "property", "PluginDefinition[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            自定义[ApolloServerPlugins](https://www.apollographql.com/docs/apollo-server/integrations/plugins/)，
它允许 Apollo 服务器的扩展，这是底层的GraphQL服务器由Picker使用。
＊
Apollo插件可以用于对输入操作或输出数据执行自定义数据转换。

{% endmemberDescription %}


