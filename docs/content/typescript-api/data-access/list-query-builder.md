---
date: 2022-04-27T09:22:19.073Z
title: "ListQueryBuilder"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# ListQueryBuilder


# ListQueryBuilder

{% generationInfo "packages/core/src/service/helpers/list-query-builder/list-query-builder.ts", "131", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
class ListQueryBuilder {
  constructor(connection: EntityManager, configService: ConfigService)
  build(entity: Type<T>, options: ListQueryOptions<T> = {}, extendedOptions: ExtendedListQueryOptions<T> = {}, embeddeds?: any[any]) => ;
}
```
## Members

### constructor

{% memberInfo "method", "(connection: EntityManager, configService: ConfigService) => ListQueryBuilder", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### build

{% memberInfo "method", "(entity: Type&#60;T&#62;, options: ListQueryOptions&#60;T&#62; = {}, extendedOptions: ExtendedListQueryOptions&#60;T&#62; = {}, embeddeds?: any[any]) => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# ExtendedListQueryOptions

{% generationInfo "packages/core/src/service/helpers/list-query-builder/list-query-builder.ts", "30", "@vendure/core" %}{% endgenerationInfo %}

可以传递给ListQueryBuilder的 `build()` 方法的选项。

## Signature

```typescript
type ExtendedListQueryOptions<T extends PickerMongoEntity> = {
  relations?: string[];
  channelId?: ID;
  where?: FindOptions<T>;
  orderBy?: FindOneOptions<T>;
  ctx?: RequestContext
  customPropertyMap?: { [name: string]: string }
}
```
## Members

### relations

{% memberInfo "property", "string[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### channelId

{% memberInfo "property", "ID", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### where

{% memberInfo "property", "FindOptions&#60;T&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### orderBy

{% memberInfo "property", "FindOneOptions&#60;T&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### ctx

{% memberInfo "property", "RequestContext", '' %}{% endmemberInfo %}

{% memberDescription %}

            当传递RequestContext时，查询将作为任何外部事务的一部分执行。

{% endmemberDescription %}

### customPropertyMap

{% memberInfo "property", "{ [name: string]: string }", '' %}{% endmemberInfo %}

{% memberDescription %}

            ListQueryBuilder的主要任务之一是基于给定实体的可用列自动生成筛选和排序查询。然而，有时也需要允许对关系的属性进行筛选/排序。
在这种情况下，可以使用‘customPropertyMap’来定义‘选项’的属性。排序”或“选项。
过滤器'，它不对应于当前实体的直接列，然后提供一个到要排序/过滤的相关属性的映射。

示例:我们希望允许排序/过滤和订单的`customerLastName`。
实际的lastName属性不是Order表中的一列，它存在于Customer实体中，并且Order通过 `Order.Customer` 与Customer关联。
因此，我们可以像这样定义customPropertyMap:

```ts
const qb = this.listQueryBuilder.build(Order, options, {
  relations: ['customer'],
  customPropertyMap: {
      customerLastName: 'customer.lastName',
  },
};
```

{% endmemberDescription %}


