---
date: 2022-04-27T09:22:19.072Z
title: "Plugin Utilities"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Plugin Utilities


# createProxyHandler

{% generationInfo "packages/core/src/plugin/plugin-utils.ts", "35", "@vendure/core" %}{% endgenerationInfo %}

创建一个代理中间件，将给定的跌幅代理给给定的端口。
使用插件启动自己的服务器，但应通过主体的 Picker url 来访问。

*Example*

```ts
// 示例：PickerPlugin 的 `configuration` 方法。
// 假设我们在 5678 端口上启动了一个 Node 服务器
// 运行一些我们想通过 `/my-plugin/` 访问的服务，要使用 Picker 服务器的主路径
@PickerPlugin({
  configuration: (config: Required<PickerConfig>) => {
      config.apiOptions.middleware.push({
          handler: createProxyHandler({
              label: 'Admin UI',
              route: 'my-plugin',
              port: 5678,
          }),
          route: 'my-plugin',
      });
      return config;
  }
})
export class MyPlugin {}
```

## Signature

```typescript
function createProxyHandler(options: ProxyOptions): RequestHandler
```
## Parameters

### options



# ProxyOptions

{% generationInfo "packages/core/src/plugin/plugin-utils.ts", "74", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
interface ProxyOptions {
  label: string;
  route: string;
  port: number;
  hostname?: string;
  basePath?: string;
}
```
## Members

### label

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            被代理的服务标签，可供人识别。用于生成信息量更大的日志。

{% endmemberDescription %}

### route

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            将作为代理 url 的 Picker 服务器的路由。

{% endmemberDescription %}

### port

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            代理服务运行的端口

{% endmemberDescription %}

### hostname

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            正在运行代理服务的服务器的主机名。

{% endmemberDescription %}

### basePath

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            代理服务器上可选的基本路径。

{% endmemberDescription %}


