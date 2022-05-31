---
date: 2022-04-27T09:22:19.055Z
title: "Administrator"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Administrator


# Administrator

{% generationInfo "packages/core/src/entity/administrator/administrator.entity.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

可以访问admin ui的管理用户

## Signature

```typescript
class Administrator extends PickerMongoEntity implements SoftDeletable {
  constructor(input?: DeepPartial<Administrator>)
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;
  @Property() name: string;
  @Property({ unique: true })
  emailAddress: string;
  @OneToOne({ })
  user: User;
  @Enum({ type: 'DomainEnum', nullable: true })
  domain: String
}
```
## Extends

 * PickerMongoEntity


## Implements

 * SoftDeletable


## Members

### constructor

{% memberInfo "method", "(input?: DeepPartial&#60;Administrator&#62;) => Administrator", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### deletedAt

{% memberInfo "property", "Date | null", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### name

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### emailAddress

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### user

{% memberInfo "property", "User", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### domain

{% memberInfo "property", "String", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


