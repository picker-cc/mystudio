---
date: 2022-04-27T09:22:19.029Z
title: "NativeAuthenticationStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# NativeAuthenticationStrategy


# NativeAuthenticationStrategy

{% generationInfo "packages/core/src/config/auth/native-authentication-strategy.ts", "29", "@vendure/core" %}{% endgenerationInfo %}

该策略实现了基于用户名/密码凭据认证，凭据存储在 Picker 数据库。
这是默认的身份验证方法，建议保持配置，除非有特定的原因。

## Signature

```typescript
class NativeAuthenticationStrategy implements AuthenticationStrategy<NativeAuthenticationData> {
  readonly readonly name = NATIVE_AUTH_STRATEGY_NAME;
  async init(injector: Injector) => ;
  defineInputType() => DocumentNode;
  async authenticate(ctx: RequestContext, data: NativeAuthenticationData) => Promise<User | false>;
  async verifyUserPassword(ctx: RequestContext, userId: ID, password: string) => Promise<boolean>;
}
```
## Implements

 * AuthenticationStrategy&#60;NativeAuthenticationData&#62;


## Members

### name

{% memberInfo "readonly property", "", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### init

{% memberInfo "async method", "(injector: Injector) => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### defineInputType

{% memberInfo "method", "() => DocumentNode", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### authenticate

{% memberInfo "async method", "(ctx: RequestContext, data: NativeAuthenticationData) => Promise&#60;User | false&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### verifyUserPassword

{% memberInfo "async method", "(ctx: RequestContext, userId: ID, password: string) => Promise&#60;boolean&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


