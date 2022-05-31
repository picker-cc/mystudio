---
date: 2022-04-27T09:22:19.052Z
title: "SessionCacheStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# SessionCacheStrategy


# SessionCacheStrategy

{% generationInfo "packages/core/src/config/session-cache/session-cache-strategy.ts", "48", "@vendure/core" %}{% endgenerationInfo %}

这个策略定义了会话的缓存方式。由于大多数请求都需要 Session 对象来获取权限数据，
因此每次访问数据库并执行多连接SQL查询都可能成为瓶颈。因此，我们缓存会话数据，在缓存失效时只执行SQL查询一次。

## Signature

```typescript
interface SessionCacheStrategy extends InjectableStrategy {
  set(session: CachedSession): void | Promise<void>;
  get(sessionToken: string): CachedSession | undefined | Promise<CachedSession | undefined>;
  delete(sessionToken: string): void | Promise<void>;
  clear(): void | Promise<void>;
}
```
## Extends

 * InjectableStrategy


## Members

### set

{% memberInfo "method", "(session: CachedSession) => void | Promise&#60;void&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            将会话存储在缓存中。当缓存一个会话时，数据不应该被修改，除非执行任何转换来将其转换为要存储的状态，
例如：JSON.stringify()

{% endmemberDescription %}

### get

{% memberInfo "method", "(sessionToken: string) => CachedSession | undefined | Promise&#60;CachedSession | undefined&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            从缓存中检索会话

{% endmemberDescription %}

### delete

{% memberInfo "method", "(sessionToken: string) => void | Promise&#60;void&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            从缓存中删除会话

{% endmemberDescription %}

### clear

{% memberInfo "method", "() => void | Promise&#60;void&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            清除整个缓存

{% endmemberDescription %}




# CachedSessionUser

{% generationInfo "packages/core/src/config/session-cache/session-cache-strategy.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

与当前会话关联的用户的简化表示

## Signature

```typescript
type CachedSessionUser = {
  id: ID;
  identifier: string;
  verified: boolean;
}
```
## Members

### id

{% memberInfo "property", "ID", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### identifier

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### verified

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# CachedSession

{% generationInfo "packages/core/src/config/session-cache/session-cache-strategy.ts", "25", "@vendure/core" %}{% endgenerationInfo %}

会话的简化表示，便于存储。

## Signature

```typescript
type CachedSession = {
  cacheExpiry: number;
  id: ID;
  token: string;
  expires: Date;
  authenticationStrategy?: string;
  user?: CachedSessionUser;
}
```
## Members

### cacheExpiry

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            时间戳，在此之后该缓存条目被认为是过期的，并将设置一个新的数据副本。
基于 `sessionCacheTTL` 选项。

{% endmemberDescription %}

### id

{% memberInfo "property", "ID", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### token

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### expires

{% memberInfo "property", "Date", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### authenticationStrategy

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### user

{% memberInfo "property", "CachedSessionUser", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


