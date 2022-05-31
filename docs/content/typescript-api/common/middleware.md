---
date: 2022-04-27T09:22:19.022Z
title: "Middleware"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Middleware


# Middleware

{% generationInfo "packages/core/src/common/types/common-types.ts", "143", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
interface Middleware {
  handler: MiddlewareHandler;
  route: string;
  beforeListen?: boolean;
}
```
## Members

### handler

{% memberInfo "property", "MiddlewareHandler", '' %}{% endmemberInfo %}

{% memberDescription %}

            The Express middleware function or NestJS `NestMiddleware` class.
Express 中间件函数或 NestJS 的 `NestMiddleware` 类。

{% endmemberDescription %}

### route

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            The route to which this middleware will apply. Pattern based routes are supported as well.
此中间件将应用于路由，也支持基于模式的路由

`'ab*cd'` 路由路径将匹配 `abcd`，`ab_cd`，`abecd`等，字符 `?`，`+`，`*`，和 `()` 可用于一个路由路径和它们对应的正则表达式的子集。
连字符（`-`）和点（`.`）按字面意思解释。

{% endmemberDescription %}

### beforeListen

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            当设置为 `true` 时，这将导致中间件在 Picker 服务器（和底层 Express 服务器）开始监听之前应用为连接。
在实践中，这意味着中间件将处于中间件堆栈的最开始，甚至在 `body-parser` 中间件是由 NestJS 自动应用的。
这在某些情况下很有用，比如当您需要访问对特定跌幅的原始解析请求。

{% endmemberDescription %}


