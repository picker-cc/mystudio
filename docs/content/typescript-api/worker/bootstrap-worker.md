---
date: 2022-04-27T09:22:19.004Z
title: "bootstrapWorker"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# bootstrapWorker


# bootstrapWorker

{% generationInfo "packages/core/src/bootstrap.ts", "86", "@vendure/core" %}{% endgenerationInfo %}

[object Object],[object Object],[object Object]

*Example*

```TypeScript
import { bootstrapWorker } from '@picker-common/core';
import { config } from './picker-config';

bootstrapWorker(config)
  .then(worker => worker.startJobQueue())
  .then(worker => worker.startHealthCheckServer({ port: 3020 }))
  .catch(err => {
    console.log(err);
  });
```

## Signature

```typescript
function bootstrapWorker(userConfig: Partial<PickerConfig>): Promise<PickerWorker>
```
## Parameters

### userConfig

