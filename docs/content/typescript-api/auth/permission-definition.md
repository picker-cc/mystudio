---
date: 2022-04-27T09:22:19.017Z
title: "PermissionDefinition"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# PermissionDefinition


# PermissionDefinition

{% generationInfo "packages/core/src/common/permission-definition.ts", "84", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object],[object Object],[object Object]

*Example*

```TypeScript
export const sync = new PermissionDefinition({
  name: 'SyncInventory',
  description: 'Allows syncing stock levels via Admin API'
});
```

```TypeScript
const config: PickerConfig = {
  authOptions: {
    customPermissions: [sync],
  },
}
```

```TypeScript
@Resolver()
export class ExternalSyncResolver {

  @Allow(sync.Permission)
  @Mutation()
  syncStockLevels() {
    // ...
  }
}
```

## Signature

```typescript
class PermissionDefinition {
  constructor(config: PermissionDefinitionConfig)
  Permission: Permission
}
```
## Members

### constructor

{% memberInfo "method", "(config: PermissionDefinitionConfig) => PermissionDefinition", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### Permission

{% memberInfo "property", "Permission", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}




# CrudPermissionDefinition

{% generationInfo "packages/core/src/common/permission-definition.ts", "144", "@vendure/core" %}{% endgenerationInfo %}

为给定的名称定义一组 CRUD 权限，例如创建一个 `name` 为 `Wishlist`
将会定义出 4 种权限:'CreateWishlist', 'ReadWishlist', 'UpdateWishlist' & 'DeleteWishlist'.

*Example*

```TypeScript
export const wishlist = new CrudPermissionDefinition('Wishlist');
```

```TypeScript
const config: PickerConfig = {
  authOptions: {
    customPermissions: [wishlist],
  },
}
```

```TypeScript
@Resolver()
export class WishlistResolver {

  @Allow(wishlist.Create)
  @Mutation()
  createWishlist() {
    // ...
  }
}
```

## Signature

```typescript
class CrudPermissionDefinition extends PermissionDefinition {
  constructor(name: string, descriptionFn?: (operation: 'create' | 'read' | 'update' | 'delete') => string)
  Create: Permission
  Read: Permission
  Update: Permission
  Delete: Permission
}
```
## Extends

 * PermissionDefinition


## Members

### constructor

{% memberInfo "method", "(name: string, descriptionFn?: (operation: 'create' | 'read' | 'update' | 'delete') =&#62; string) => CrudPermissionDefinition", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### Create

{% memberInfo "property", "Permission", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}

### Read

{% memberInfo "property", "Permission", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}

### Update

{% memberInfo "property", "Permission", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}

### Delete

{% memberInfo "property", "Permission", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}




# PermissionDefinitionConfig

{% generationInfo "packages/core/src/common/permission-definition.ts", "10", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object]

## Signature

```typescript
interface PermissionDefinitionConfig {
  name: string;
  description?: string;
  assignable?: boolean;
  internal?: boolean;
}
```
## Members

### name

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            权限名，按照惯例，应该是这样的
UpperCamelCased

{% endmemberDescription %}

### description

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            权限描述

{% endmemberDescription %}

### assignable

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            定义该权限是否可以分配给角色。一般来说这个除非在特殊情况下，应该保留为默认为 `true`

{% endmemberDescription %}

### internal

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            内部权限不会通过 API 暴露，而是保留给特殊的用例，如在 `Owner` 或 `Public` 权限。

{% endmemberDescription %}


