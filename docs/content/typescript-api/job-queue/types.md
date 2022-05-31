---
date: 2022-04-27T09:22:19.033Z
title: "types"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# types


# CreateQueueOptions

{% generationInfo "packages/core/src/config/entity-id-strategy/types.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
interface CreateQueueOptions<T extends JobData<T>> {
  name: string;
  process: (job: Job<T>) => Promise<any>;
}
```
## Members

### name

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            The name of the queue, e.g. "image processing", "re-indexing" etc.

{% endmemberDescription %}

### process

{% memberInfo "property", "(job: Job&#60;T&#62;) =&#62; Promise&#60;any&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            Defines the work to be done for each job in the queue. The returned promise
should resolve when the job is complete, or be rejected in case of an error.

{% endmemberDescription %}




# JobData

{% generationInfo "packages/core/src/config/entity-id-strategy/types.ts", "35", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
type JobData<T> = JsonCompatible<T>
```


# JobConfig

{% generationInfo "packages/core/src/config/entity-id-strategy/types.ts", "44", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object]

## Signature

```typescript
interface JobConfig<T extends JobData<T>> {
  queueName: string;
  data: T;
  retries?: number;
  attempts?: number;
  id?: ID;
  state?: JobState;
  progress?: number;
  result?: any;
  error?: any;
  createdAt?: Date;
  startedAt?: Date;
  settledAt?: Date;
}
```
## Members

### queueName

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### data

{% memberInfo "property", "T", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### retries

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### attempts

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### id

{% memberInfo "property", "ID", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### state

{% memberInfo "property", "JobState", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### progress

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### result

{% memberInfo "property", "any", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### error

{% memberInfo "property", "any", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### createdAt

{% memberInfo "property", "Date", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### startedAt

{% memberInfo "property", "Date", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### settledAt

{% memberInfo "property", "Date", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


