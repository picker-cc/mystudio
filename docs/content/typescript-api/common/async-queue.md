---
date: 2022-04-27T09:22:19.008Z
title: "AsyncQueue"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AsyncQueue


# AsyncQueue

{% generationInfo "packages/core/src/common/async-queue.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

A queue class for limiting concurrent async tasks. This can be used e.g. to prevent
race conditions when working on a shared resource such as writing to a database.

## Signature

```typescript
class AsyncQueue {
  constructor(label: string = 'default', concurrency: number = 1)
  push(task: Task<T>) => Promise<T>;
}
```
## Members

### constructor

{% memberInfo "method", "(label: string = 'default', concurrency: number = 1) => AsyncQueue", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### push

{% memberInfo "method", "(task: Task&#60;T&#62;) => Promise&#60;T&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            Pushes a new task onto the queue, upon which the task will either execute immediately or
(if the number of running tasks is equal to the concurrency limit) enqueue the task to
be executed at the soonest opportunity.

{% endmemberDescription %}


