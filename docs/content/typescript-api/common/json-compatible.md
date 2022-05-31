---
date: 2022-04-27T09:22:19.083Z
title: "JsonCompatible"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# JsonCompatible


# JsonCompatible

{% generationInfo "packages/common/src/shared-types.ts", "30", "@vendure/common" %}{% endgenerationInfo %}

一种表示 JSON-compatible 兼容值的类型
From https://github.com/microsoft/TypeScript/issues/1897#issuecomment-580962081

## Signature

```typescript
type JsonCompatible<T> = {
    [P in keyof T]: T[P] extends Json ? T[P] : Pick<T, P> extends Required<Pick<T, P>> ? never : JsonCompatible<T[P]>;
}
```
