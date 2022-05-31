---
date: 2022-04-27T09:22:19.003Z
title: "Ctx Decorator"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Ctx Decorator


# Ctx

{% generationInfo "packages/core/src/api/decorators/request-context.decorator.ts", "21", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

*Example*

```TypeScript
 @Query()
 getAdministrators(@Ctx() ctx: RequestContext) {
     // ...
 }
```

