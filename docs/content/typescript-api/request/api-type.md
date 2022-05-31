---
date: 2022-04-27T09:22:18.995Z
title: "ApiType"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# ApiType


# ApiType

{% generationInfo "packages/core/src/api/common/get-api-type.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

Which of the GraphQL APIs the current request came via.
admin 管理端
csm 客户服务端
minapp 小程序端
minapp-ee(Enterprise Edition) 企业小程序端

## Signature

```typescript
type ApiType = 'admin' | 'cms' | 'weapp' | 'custom'
```
