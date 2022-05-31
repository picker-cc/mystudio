---
date: 2022-04-27T09:22:19.051Z
title: "NoopSessionCacheStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# NoopSessionCacheStrategy


# NoopSessionCacheStrategy

{% generationInfo "packages/core/src/config/session-cache/noop-session-cache-strategy.ts", "9", "@vendure/core" %}{% endgenerationInfo %}

不缓存的缓存查找每次都会失败，因此会话将总是从数据库中获取。

## Signature

```typescript
class NoopSessionCacheStrategy implements SessionCacheStrategy {
  clear() => ;
  delete(sessionToken: string) => ;
  get(sessionToken: string) => ;
  set(session: CachedSession) => ;
}
```
## Implements

 * SessionCacheStrategy


## Members

### clear

{% memberInfo "method", "() => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### delete

{% memberInfo "method", "(sessionToken: string) => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### get

{% memberInfo "method", "(sessionToken: string) => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### set

{% memberInfo "method", "(session: CachedSession) => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


