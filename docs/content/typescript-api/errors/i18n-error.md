---
date: 2022-04-27T09:22:19.067Z
title: "I18nError"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# I18nError


# I18nError

{% generationInfo "packages/core/src/i18n/i18n-error.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

在 Picker 服务器中所有错误的抛出必需要使用或扩展这个错误类。这允许错误消息在送达客户端之前被翻译。

错误信息应该以对应的字符串 key 的形式提供，并在 `i18n/messages/<languageCode>.json` 中定义键。

注意：这个抽象类不应该直接在代码中使用，应该被扩展成一个更具体的 Error 类。

## Signature

```typescript
class I18nError extends ApolloError {
  constructor(message: string, variables: { [key: string]: string | number } = {}, code?: string, logLevel: LogLevel = LogLevel.Warn)
}
```
## Extends

 * ApolloError


## Members

### constructor

{% memberInfo "protected method", "(message: string, variables: { [key: string]: string | number } = {}, code?: string, logLevel: LogLevel = LogLevel.Warn) => I18nError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


