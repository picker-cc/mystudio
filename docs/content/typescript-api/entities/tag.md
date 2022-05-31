---
date: 2022-04-27T09:22:19.058Z
title: "Tag"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Tag


# Tag

{% generationInfo "packages/core/src/entity/tag/tag.entity.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

A tag is an arbitrary label which can be applied to certain entities.
It is used to help organize and filter those entities.

## Signature

```typescript
class Tag extends PickerMongoEntity {
  constructor(input?: DeepPartial<Tag>)
  @Property()
    value: string;
}
```
## Extends

 * PickerMongoEntity


## Members

### constructor

{% memberInfo "method", "(input?: DeepPartial&#60;Tag&#62;) => Tag", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### value

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


