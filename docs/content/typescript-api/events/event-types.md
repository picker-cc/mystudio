---
date: 2022-04-27T09:22:19.059Z
title: "Event Types"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Event Types


# AssetEvent

{% generationInfo "packages/core/src/event-bus/events/asset-event.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
class AssetEvent extends PickerEvent {
  constructor(ctx: RequestContext, asset: Asset, type: 'created' | 'updated' | 'deleted')
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, asset: Asset, type: 'created' | 'updated' | 'deleted') => AssetEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# CommentEvent

{% generationInfo "packages/core/src/event-bus/events/comment-event.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

评价或评论时触发

## Signature

```typescript
class CommentEvent extends PickerEvent {
  constructor(ctx: RequestContext, toUser: string, type: CommentType, id: string)
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, toUser: string, type: CommentType, id: string) => CommentEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# CustomerEvent

{% generationInfo "packages/core/src/event-bus/events/customer-event.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

当客户创建、更新时触发

## Signature

```typescript
class CustomerEvent extends PickerEvent {
  constructor(ctx: RequestContext, type: 'created' | 'batchCreated' | 'updated' | 'deleted', users: User[])
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, type: 'created' | 'batchCreated' | 'updated' | 'deleted', users: User[]) => CustomerEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# FoodEvent

{% generationInfo "packages/core/src/event-bus/events/food-event.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
class FoodEvent extends PickerEvent {
  constructor(ctx: RequestContext, food: Food, type: 'created' | 'updated' | 'deleted')
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, food: Food, type: 'created' | 'updated' | 'deleted') => FoodEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# FoodlogEvent

{% generationInfo "packages/core/src/event-bus/events/foodlog-event.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
class FoodlogEvent extends PickerEvent {
  constructor(ctx: RequestContext, foodlog: Foodlog, type: 'created' | 'updated' | 'deleted')
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, foodlog: Foodlog, type: 'created' | 'updated' | 'deleted') => FoodlogEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# LoginEvent

{% generationInfo "packages/core/src/event-bus/events/login-event.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

当用户通过 API `login` 成功登录时，将触发此事件。

## Signature

```typescript
class LoginEvent extends PickerEvent {
  constructor(ctx: RequestContext, user: User)
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, user: User) => LoginEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# LogoutEvent

{% generationInfo "packages/core/src/event-bus/events/logout-event.ts", "11", "@vendure/core" %}{% endgenerationInfo %}

当用户通过 API `logout` mutation注销时，将触发此事件。

## Signature

```typescript
class LogoutEvent extends PickerEvent {
  constructor(ctx: RequestContext)
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext) => LogoutEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# MessageEvent

{% generationInfo "packages/core/src/event-bus/events/message-event.ts", "11", "@vendure/core" %}{% endgenerationInfo %}

当消息触发时

## Signature

```typescript
class MessageEvent extends PickerEvent {
  constructor(ctx: RequestContext, type: 'remind')
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, type: 'remind') => MessageEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# OrderEvent

{% generationInfo "packages/core/src/event-bus/events/order-event.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

当订单创建、更新时触发

## Signature

```typescript
class OrderEvent extends PickerEvent {
  constructor(ctx: RequestContext, serviceOrder: UserServiceOrder, type: OrderState)
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(ctx: RequestContext, serviceOrder: UserServiceOrder, type: OrderState) => OrderEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# QuestionEvent

{% generationInfo "packages/core/src/event-bus/events/question-event.ts", "14", "@vendure/core" %}{% endgenerationInfo %}

问卷数据上传事件

## Signature

```typescript
class QuestionEvent extends PickerEvent {
  constructor(questionType: ReportType, type: 'created' | 'deleted' | 'updated', questionList: Question[])
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(questionType: ReportType, type: 'created' | 'deleted' | 'updated', questionList: Question[]) => QuestionEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}




# ServiceItemEvent

{% generationInfo "packages/core/src/event-bus/events/service-item-event.ts", "11", "@vendure/core" %}{% endgenerationInfo %}

当服务套餐中 Remind 事项建立、更新时触发
目的是将这些事项添加到定时任务的 任务定义中

## Signature

```typescript
class ServiceItemEvent extends PickerEvent {
  constructor(serviceItems: ServiceItem[], type: 'created' | 'deleted')
}
```
## Extends

 * PickerEvent


## Members

### constructor

{% memberInfo "method", "(serviceItems: ServiceItem[], type: 'created' | 'deleted') => ServiceItemEvent", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


