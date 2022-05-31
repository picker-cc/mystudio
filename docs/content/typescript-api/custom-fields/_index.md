---
date: 2022-04-27T09:22:19.086Z
title: "CustomFields"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# CustomFields


# CustomFields

{% generationInfo "packages/common/src/shared-types.ts", "88", "@vendure/common" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

*Example*

```typescript
bootstrap({
    // ...
    customFields: {
        Product: [
            { name: 'infoUrl', type: 'string' },
            { name: 'downloadable', type: 'boolean' },
            { name: 'shortName', type: 'localeString' },
        ],
        User: [
            { name: 'socialLoginToken', type: 'string' },
        ],
    },
})
```

## Signature

```typescript
interface CustomFields {
  Address?: CustomFieldConfig[];
  Administrator: CustomFieldConfig[];
  Asset: CustomFieldConfig[];
  Customer?: CustomFieldConfig[];
  GlobalSettings?: CustomFieldConfig[];
  User?: CustomFieldConfig[];
}
```
## Members

### Address

{% memberInfo "property", "CustomFieldConfig[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### Administrator

{% memberInfo "property", "CustomFieldConfig[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### Asset

{% memberInfo "property", "CustomFieldConfig[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### Customer

{% memberInfo "property", "CustomFieldConfig[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### GlobalSettings

{% memberInfo "property", "CustomFieldConfig[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### User

{% memberInfo "property", "CustomFieldConfig[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


