---
date: 2022-04-27T09:22:19.023Z
title: "EntityRelationPaths"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# EntityRelationPaths


# EntityRelationPaths

{% generationInfo "packages/core/src/common/types/entity-relation-paths.ts", "22", "@vendure/core" %}{% endgenerationInfo %}

这种类型允许使用带点符号的字符串对实体关系进行类型安全访问。
它可以达到2级深度。

*Example*

```TypeScript
type T1 = EntityRelationPaths<Product>;
```
在上面的例子中，类型' T1 '将是' Product '实体的所有关系的字符串并集:

 * `'featuredAsset'`
 * `'variants'`
 * `'variants.options'`
 * `'variants.featuredAsset'`
 * etc.

## Signature

```typescript
type EntityRelationPaths<T extends PickerMongoEntity> = | PathsToStringProps1<T>
    | Join<PathsToStringProps2<T>, '.'>
    | TripleDotPath
```
