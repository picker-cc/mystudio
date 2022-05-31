---
date: 2022-04-27T09:22:19.050Z
title: "InMemorySessionCacheStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# InMemorySessionCacheStrategy


# InMemorySessionCacheStrategy

{% generationInfo "packages/core/src/config/session-cache/in-memory-session-cache-strategy.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

在内存中缓存会话，使用 LRU（Least Recently Used） 缓存实现。不适合多服务器设置，因为缓存对每个实例都是本地的，
这会降低其有效性。默认情况下，缓存的大小为 1000，这意味着在缓存了1000个会话之后，任何新会话都会导致最近
使用最少的会话将从缓存中移除（删除）

缓存大小可以通过传递一个不同的数字给构造函数来配置

## Signature

```typescript
class InMemorySessionCacheStrategy implements SessionCacheStrategy {
  constructor(cacheSize?: number)
  delete(sessionToken: string) => ;
  get(sessionToken: string) => ;
  set(session: CachedSession) => ;
  clear() => ;
}
```
## Implements

 * SessionCacheStrategy


## Members

### constructor

{% memberInfo "method", "(cacheSize?: number) => InMemorySessionCacheStrategy", '' %}{% endmemberInfo %}

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

### clear

{% memberInfo "method", "() => ", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


