---
date: 2022-04-27T09:22:19.048Z
title: "JobQueueOptions"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# JobQueueOptions


# JobQueueOptions

{% generationInfo "packages/core/src/config/picker-config.ts", "393", "@vendure/core" %}{% endgenerationInfo %}

内置队列的配置选项

## Signature

```typescript
interface JobQueueOptions {
  activeQueues?: string[];
}
```
## Members

### activeQueues

{% memberInfo "property", "string[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            定义将在此进程中运行的队列
这可以用来配置仅某些队列在此进程中运行
如果它是空的，所有队列将运行

{% endmemberDescription %}


