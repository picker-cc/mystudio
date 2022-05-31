---
date: 2022-04-27T09:22:19.014Z
title: "Injector"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Injector


# Injector

{% generationInfo "packages/core/src/common/injector.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

注入器封装了底层的 Nestjs `ModuleRef`，允许注入应用依赖注入容器中已知的 providers。
这是为了允许将服务注入到存在于 Nestjs 模块系统之外的对象中，
例如可以在 PickerConfig 中提供的各种策略。

## Signature

```typescript
class Injector {
  constructor(moduleRef: ModuleRef)
  get(typeOrToken: Type<T> | string | symbol) => R;
  resolve(typeOrToken: Type<T> | string | symbol, contextId?: ContextId) => Promise<R>;
}
```
## Members

### constructor

{% memberInfo "method", "(moduleRef: ModuleRef) => Injector", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### get

{% memberInfo "method", "(typeOrToken: Type&#60;T&#62; | string | symbol) => R", '' %}{% endmemberInfo %}

{% memberDescription %}

            从应用的依赖注入容器中获取一个给定类型的实例，
包装 Nestjs 的 `ModuleRef.get()` 方法。

{% endmemberDescription %}

### resolve

{% memberInfo "method", "(typeOrToken: Type&#60;T&#62; | string | symbol, contextId?: ContextId) => Promise&#60;R&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            从应用的依赖注入容器中获取给定作用域的 provider 实例（transient 或 request-scoped）
包装 Nestjs `ModuleRef.resolve()` 方法。

{% endmemberDescription %}


