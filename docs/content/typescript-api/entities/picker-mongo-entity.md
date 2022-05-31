---
date: 2022-04-27T09:22:19.056Z
title: "PickerMongoEntity"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# PickerMongoEntity


# PickerMongoEntity

{% generationInfo "packages/core/src/entity/base/mongo-base.entity.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object]

## Signature

```typescript
class PickerMongoEntity {
  constructor(input?: DeepPartial<PickerMongoEntity>)
  @PrimaryKey()
    _id!: ObjectId;
  @SerializedPrimaryKey()
    id!: ID;
  @Property({
        type: Date,
    })
    createdAt = new Date();
  @Property({
        type: Date,
        onUpdate: () => new Date(),
    })
    @Index()
    updatedAt = new Date();
}
```
## Members

### constructor

{% memberInfo "protected method", "(input?: DeepPartial&#60;PickerMongoEntity&#62;) => PickerMongoEntity", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### _id

{% memberInfo "property", "ObjectId", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### id

{% memberInfo "property", "ID", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### createdAt

{% memberInfo "property", "", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### updatedAt

{% memberInfo "property", "", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


