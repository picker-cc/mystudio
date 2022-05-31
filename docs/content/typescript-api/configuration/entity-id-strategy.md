---
date: 2022-04-27T09:22:19.030Z
title: "EntityIdStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# EntityIdStrategy


# AutoIncrementIdStrategy

{% generationInfo "packages/core/src/config/entity-id-strategy/auto-increment-id-strategy.ts", "11", "@vendure/core" %}{% endgenerationInfo %}

An id strategy which uses auto-increment integers as primary keys
for all entities. This is the default strategy used by Vendure.

## Signature

```typescript
class AutoIncrementIdStrategy implements EntityIdStrategy<'increment'> {
  readonly readonly primaryKeyType = 'increment';
  decodeId(id: string) => number;
  encodeId(primaryKey: number) => string;
}
```
## Implements

 * EntityIdStrategy&#60;'increment'&#62;


## Members

### primaryKeyType

{% memberInfo "readonly property", "", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### decodeId

{% memberInfo "method", "(id: string) => number", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### encodeId

{% memberInfo "method", "(primaryKey: number) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# EntityIdStrategy

{% generationInfo "packages/core/src/config/entity-id-strategy/entity-id-strategy.ts", "18", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object],[object Object],[object Object]

## Signature

```typescript
interface EntityIdStrategy<T extends 'increment' | 'uuid' | 'objectId'> extends InjectableStrategy {
  readonly primaryKeyType: T;
  encodeId: (primaryKey: PrimaryKeyType<T>) => string;
  decodeId: (id: string) => PrimaryKeyType<T>;
}
```
## Extends

 * InjectableStrategy


## Members

### primaryKeyType

{% memberInfo "readonly property", "T", '' %}{% endmemberInfo %}

{% memberDescription %}

            Defines how the primary key will be stored in the database - either
`'increment'` for auto-increment integer IDs, or `'uuid'` for a unique
string ID.

{% endmemberDescription %}

### encodeId

{% memberInfo "property", "(primaryKey: PrimaryKeyType&#60;T&#62;) =&#62; string", '' %}{% endmemberInfo %}

{% memberDescription %}

            Allows the raw ID from the database to be transformed in some way before exposing
it in the GraphQL API.

For example, you may need to use auto-increment integer IDs due to some business
constraint, but you may not want to expose this data publicly in your API. In this
case, you can use the encode/decode methods to obfuscate the ID with some kind of
encoding scheme, such as base64 (or something more sophisticated).

{% endmemberDescription %}

### decodeId

{% memberInfo "property", "(id: string) =&#62; PrimaryKeyType&#60;T&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            Reverses the transformation performed by the `encodeId` method in order to get
back to the raw ID value.

{% endmemberDescription %}




# ObjectIdStrategy

{% generationInfo "packages/core/src/config/entity-id-strategy/object-id-strategy.ts", "15", "@vendure/core" %}{% endgenerationInfo %}

实体的主键 ID 策略

*Example*

```typescript
}
```

## Signature

```typescript
class ObjectIdStrategy implements EntityIdStrategy<'objectId'> {
  readonly readonly primaryKeyType = 'objectId';
  decodeId(id: string) => string;
  encodeId(primaryKey: string) => string;
}
```
## Implements

 * EntityIdStrategy&#60;'objectId'&#62;


## Members

### primaryKeyType

{% memberInfo "readonly property", "", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### decodeId

{% memberInfo "method", "(id: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### encodeId

{% memberInfo "method", "(primaryKey: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# UuidIdStrategy

{% generationInfo "packages/core/src/config/entity-id-strategy/uuid-id-strategy.ts", "22", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

*Example*

```typescript
import { UuidIdStrategy, VendureConfig } from '@vendure/core';

export const config: VendureConfig = {
  entityIdStrategy: new UuidIdStrategy(),
  // ...
}
```

## Signature

```typescript
class UuidIdStrategy implements EntityIdStrategy<'uuid'> {
  readonly readonly primaryKeyType = 'uuid';
  decodeId(id: string) => string;
  encodeId(primaryKey: string) => string;
}
```
## Implements

 * EntityIdStrategy&#60;'uuid'&#62;


## Members

### primaryKeyType

{% memberInfo "readonly property", "", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### decodeId

{% memberInfo "method", "(id: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### encodeId

{% memberInfo "method", "(primaryKey: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


