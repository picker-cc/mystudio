---
date: 2022-04-27T09:22:19.089Z
title: "AdminUiAppDevModeConfig"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AdminUiAppDevModeConfig


# AdminUiAppDevModeConfig

{% generationInfo "packages/common/src/shared-types.ts", "227", "@vendure/common" %}{% endgenerationInfo %}

Admin UI app dev服务器的信息。

## Signature

```typescript
interface AdminUiAppDevModeConfig {
  sourcePath: string;
  port: number;
  route?: string;
  compile: () => Promise<void>;
}
```
## Members

### sourcePath

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            未编译的ui app源文件的路径。这个路径应该包含 `venture -ui-config.json` 文件。

{% endmemberDescription %}

### port

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            dev服务器正在监听的端口。覆盖 `AdminUiOptions.port` 设置的值。

{% endmemberDescription %}

### route

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            指定到 Admin UI 应用程序的 url 路由。

{% endmemberDescription %}

### compile

{% memberInfo "property", "() =&#62; Promise&#60;void&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            该函数将被调用以启动应用程序编译过程。

{% endmemberDescription %}


