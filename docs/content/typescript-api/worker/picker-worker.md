---
date: 2022-04-27T09:22:19.075Z
title: "PickerWorker"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# PickerWorker


# PickerWorker

{% generationInfo "packages/core/src/worker/picker-worker.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

## Signature

```typescript
class PickerWorker {
  public public app: INestApplicationContext;
  constructor(app: INestApplicationContext)
  async startJobQueue() => Promise<PickerWorker>;
  async startHealthCheckServer(healthCheckConfig: WorkerHealthCheckConfig) => Promise<PickerWorker>;
}
```
## Members

### app

{% memberInfo "public property", "INestApplicationContext", '' %}{% endmemberInfo %}

{% memberDescription %}

            对 `INestApplicationContext` 对象的引用，
它代表了 NestJS[独立应用程序](https://docs.nestjs.com/standalone-applications) 实例。

{% endmemberDescription %}

### constructor

{% memberInfo "method", "(app: INestApplicationContext) => PickerWorker", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### startJobQueue

{% memberInfo "async method", "() => Promise&#60;PickerWorker&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            启动作业队列，以便 worker 可以处理后台作业。

{% endmemberDescription %}

### startHealthCheckServer

{% memberInfo "async method", "(healthCheckConfig: WorkerHealthCheckConfig) => Promise&#60;PickerWorker&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            启动一个简单的 http 服务器，可以用作工作实例的健康检查。
这个 endpoint 可以被窗口业务流程服务（如Kubernetes）用来验证 worker 是否正在运行。

{% endmemberDescription %}


