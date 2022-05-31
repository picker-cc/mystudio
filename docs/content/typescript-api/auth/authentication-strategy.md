---
date: 2022-04-27T09:22:19.027Z
title: "AuthenticationStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AuthenticationStrategy


# AuthenticationStrategy

{% generationInfo "packages/core/src/config/auth/authentication-strategy.ts", "16", "@vendure/core" %}{% endgenerationInfo %}

An AuthenticationStrategy defines how a User (which can be a Customer in the Shop API or
and Administrator in the Admin API) may be authenticated.

Real-world examples can be found in the [Authentication guide](/docs/developer-guide/authentication/).

## Signature

```typescript
interface AuthenticationStrategy<Data = unknown> extends InjectableStrategy {
  readonly name: string;
  defineInputType(): DocumentNode;
  authenticate(ctx: RequestContext, data: Data): Promise<User | false | string>;
  onLogOut?(ctx: RequestContext, user: User): Promise<void>;
}
```
## Extends

 * InjectableStrategy


## Members

### name

{% memberInfo "readonly property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            The name of the strategy, for example `'facebook'`, `'google'`, `'keycloak'`.

{% endmemberDescription %}

### defineInputType

{% memberInfo "method", "() => DocumentNode", '' %}{% endmemberInfo %}

{% memberDescription %}

            Defines the type of the GraphQL Input object expected by the `authenticate`
mutation. The final input object will be a map, with the key being the name
of the strategy. The shape of the input object should match the generic `Data`
type argument.

*Example*

For example, given the following:

```typescript
defineInputType() {
  return gql`
     input MyAuthInput {
       token: String!
     }
  `;
}
```

assuming the strategy name is "my_auth", then the resulting call to `authenticate`
would look like:

```graphql
authenticate(input: {
  my_auth: {
    token: "foo"
  }
}) {
  # ...
}
```

**Note:** if more than one graphql `input` type is being defined (as in a nested input type), then
the _first_ input will be assumed to be the top-level input.

{% endmemberDescription %}

### authenticate

{% memberInfo "method", "(ctx: RequestContext, data: Data) => Promise&#60;User | false | string&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            [object Object],[object Object],[object Object]

{% endmemberDescription %}

### onLogOut

{% memberInfo "method", "(ctx: RequestContext, user: User) => Promise&#60;void&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            Called when a user logs out, and may perform any required tasks
related to the user logging out with the external provider.

{% endmemberDescription %}


