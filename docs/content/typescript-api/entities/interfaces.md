---
date: 2022-04-27T09:22:19.020Z
title: "interfaces"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# interfaces


# SoftDeletable

{% generationInfo "packages/core/src/common/types/common-types.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

可以软件删除的实体应该实现该接口

## Signature

```typescript
interface SoftDeletable {
  deletedAt: Date | null;
}
```
## Members

### deletedAt

{% memberInfo "property", "Date | null", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# Orderable

{% generationInfo "packages/core/src/common/types/common-types.ts", "23", "@vendure/core" %}{% endgenerationInfo %}

在一个列表中需要排序的实体应该实现该接口

## Signature

```typescript
interface Orderable {
  position: number;
}
```
## Members

### position

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# Taggable

{% generationInfo "packages/core/src/common/types/common-types.ts", "34", "@vendure/core" %}{% endgenerationInfo %}

实体需要标签的时候应该实现该接口

## Signature

```typescript
interface Taggable {
  tags: Tag[];
}
```
## Members

### tags

{% memberInfo "property", "Tag[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# Translatable

{% generationInfo "packages/core/src/common/types/locale-types.ts", "28", "@vendure/core" %}{% endgenerationInfo %}

具有可本地化 localizable 字符串属性的实休应该实现这种类型

## Signature

```typescript
interface Translatable {
  translations: Array<Translation<PickerMongoEntity>>;
}
```
## Members

### translations

{% memberInfo "property", "Array&#60;Translation&#60;PickerMongoEntity&#62;&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


