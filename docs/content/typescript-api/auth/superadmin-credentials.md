---
date: 2022-04-27T09:22:19.048Z
title: "SuperadminCredentials"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# SuperadminCredentials


# SuperadminCredentials

{% generationInfo "packages/core/src/config/picker-config.ts", "354", "@vendure/core" %}{% endgenerationInfo %}

这些凭证将用于创建超级管理员用户
当系统第一次启动时生成。

## Signature

```typescript
interface SuperadminCredentials {
  identifier: string;
  password: string;
}
```
## Members

### identifier

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            The identifier to be used to create a superadmin account

{% endmemberDescription %}

### password

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            The password to be used to create a superadmin account

{% endmemberDescription %}


