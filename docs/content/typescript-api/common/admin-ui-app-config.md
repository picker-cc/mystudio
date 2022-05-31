---
date: 2022-04-27T09:22:19.088Z
title: "AdminUiAppConfig"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AdminUiAppConfig


# AdminUiAppConfig

{% generationInfo "packages/common/src/shared-types.ts", "198", "@vendure/common" %}{% endgenerationInfo %}

配置 Admin UI 应用程序的自定义构建路径

## Signature

```typescript
interface AdminUiAppConfig {
  path: string;
  route?: string;
  compile?: () => Promise<void>;
}
```
## Members

### path

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            已编译的 admin ui app 文件的路径。如果未指定，则使用内部默认构建。
这个路径应该包含`picker-ui-config` Json
The path to the compiled admin ui app files. If not specified, an internal
default build is used. This path should contain the `vendure-ui-config.json` file,
index.html, the compiled js bundles etc.

{% endmemberDescription %}

### route

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            指定到Admin UI应用程序的url路由。

{% endmemberDescription %}

### compile

{% memberInfo "property", "() =&#62; Promise&#60;void&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            该函数将被调用以启动应用程序编译过程。

{% endmemberDescription %}


