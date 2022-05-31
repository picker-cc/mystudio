---
date: 2022-04-27T09:22:19.011Z
title: "Error Types"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Error Types


# InternalServerError

{% generationInfo "packages/core/src/common/error/errors.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

当遇到意外和异常情况时，应该抛出此错误。

## Signature

```typescript
class InternalServerError extends I18nError {
  constructor(message: string, variables: { [key: string]: string | number } = {})
}
```
## Extends

 * I18nError


## Members

### constructor

{% memberInfo "method", "(message: string, variables: { [key: string]: string | number } = {}) => InternalServerError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# UserInputError

{% generationInfo "packages/core/src/common/error/errors.ts", "26", "@vendure/core" %}{% endgenerationInfo %}

当用户输入不符合预期时，应该抛出此错误。

## Signature

```typescript
class UserInputError extends I18nError {
  constructor(message: string, variables: { [key: string]: string | number } = {})
}
```
## Extends

 * I18nError


## Members

### constructor

{% memberInfo "method", "(message: string, variables: { [key: string]: string | number } = {}) => UserInputError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# IllegalOperationError

{% generationInfo "packages/core/src/common/error/errors.ts", "39", "@vendure/core" %}{% endgenerationInfo %}

当尝试不允许的操作时，应该抛出此错误。

## Signature

```typescript
class IllegalOperationError extends I18nError {
  constructor(message: string, variables: { [key: string]: string | number } = {})
}
```
## Extends

 * I18nError


## Members

### constructor

{% memberInfo "method", "(message: string, variables: { [key: string]: string | number } = {}) => IllegalOperationError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# UnauthorizedError

{% generationInfo "packages/core/src/common/error/errors.ts", "52", "@vendure/core" %}{% endgenerationInfo %}

当用户的身份验证凭证不匹配时，应该抛出此错误。

## Signature

```typescript
class UnauthorizedError extends I18nError {
  constructor()
}
```
## Extends

 * I18nError


## Members

### constructor

{% memberInfo "method", "() => UnauthorizedError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# ForbiddenError

{% generationInfo "packages/core/src/common/error/errors.ts", "65", "@vendure/core" %}{% endgenerationInfo %}

当用户试图访问超出其权限范围的资源时，应该抛出此错误。

## Signature

```typescript
class ForbiddenError extends I18nError {
  constructor(logLevel: LogLevel = LogLevel.Error)
}
```
## Extends

 * I18nError


## Members

### constructor

{% memberInfo "method", "(logLevel: LogLevel = LogLevel.Error) => ForbiddenError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# EntityNotFoundError

{% generationInfo "packages/core/src/common/error/errors.ts", "78", "@vendure/core" %}{% endgenerationInfo %}

当一个实体在数据库中找不到时，即给定的entityName (Product, User等)的实体不存在，该错误应该被抛出。

## Signature

```typescript
class EntityNotFoundError extends I18nError {
  constructor(entityName: keyof typeof coreEntitiesMap, id: ID)
}
```
## Extends

 * I18nError


## Members

### constructor

{% memberInfo "method", "(entityName: keyof typeof coreEntitiesMap, id: ID) => EntityNotFoundError", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


