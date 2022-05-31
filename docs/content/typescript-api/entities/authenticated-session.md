---
date: 2022-04-27T09:22:19.057Z
title: "AuthenticatedSession"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AuthenticatedSession


# AuthenticatedSession

{% generationInfo "packages/core/src/entity/session/authenticated-session.entity.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

认证成功后将创建 AuthenticatedSession

## Signature

```typescript
class AuthenticatedSession extends Session {
  constructor(input: DeepPartial<AuthenticatedSession>)
  @ManyToOne(type => User)
    user: User;
  @Property()
    authenticationStrategy: string;
}
```
## Extends

 * Session


## Members

### constructor

{% memberInfo "method", "(input: DeepPartial&#60;AuthenticatedSession&#62;) => AuthenticatedSession", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### user

{% memberInfo "property", "User", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object]

{% endmemberDescription %}

### authenticationStrategy

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}


