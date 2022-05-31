---
date: 2022-04-27T09:22:19.000Z
title: "Api Decorator"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Api Decorator


# Api

{% generationInfo "packages/core/src/api/decorators/api.decorator.ts", "26", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

*Example*

```TypeScript
 @Query()
 getAdministrators(@Api() apiType: ApiType) {
   if (apiType === 'admin') {
     // ...
   }
 }
```

