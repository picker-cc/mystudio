---
date: 2022-04-27T09:22:19.076Z
title: "WorkerHealthCheckConfig"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# WorkerHealthCheckConfig


# WorkerHealthCheckConfig

{% generationInfo "packages/core/src/worker/worker-health.service.ts", "13", "@vendure/core" %}{% endgenerationInfo %}

指定 Worker 的 HTTP 健康检查 endpoint 的配置。

## Signature

```typescript
interface WorkerHealthCheckConfig {
  port: number;
  hostname?: string;
  route?: string;
}
```
## Members

### port

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            worker 将要监听的端口

{% endmemberDescription %}

### hostname

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            主机名

{% endmemberDescription %}

### route

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            健康检查可用的路由

{% endmemberDescription %}


