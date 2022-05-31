---
date: 2022-04-27T09:22:19.049Z
title: "EntityOptions"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# EntityOptions


# EntityOptions

{% generationInfo "packages/core/src/config/picker-config.ts", "418", "@vendure/core" %}{% endgenerationInfo %}

与实体的内部处理有关的选项。

## Signature

```typescript
interface EntityOptions {
  entityIdStrategy?: EntityIdStrategy<any>;
  zoneCacheTtl?: number;
}
```
## Members

### entityIdStrategy

{% memberInfo "property", "EntityIdStrategy&#60;any&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            定义在数据库中存储实体的主键的策略，以及通过 API 暴露实体时对这些 id 和编码解码。
黑夜值使用一个简单的自动递增整数策略。

// *

{% endmemberDescription %}

### zoneCacheTtl

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            区域缓存在内存中，因为它们被频繁访问。这个设置决定了缓存的生存时间（以 ms 为单位），
直到它被认为是旧的。对于多实例部署（例如无服务器、负载平衡），这里的一个较小的值将防止实例之间的数据不一致。

{% endmemberDescription %}


