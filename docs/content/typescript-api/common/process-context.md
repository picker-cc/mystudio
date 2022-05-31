---
date: 2022-04-27T09:22:19.073Z
title: "ProcessContext"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# ProcessContext


# ProcessContext

{% generationInfo "packages/core/src/process-context/process-context.ts", "29", "@vendure/core" %}{% endgenerationInfo %}

ProcessContext 可以被注入到你的 providers & modules，以便知道它是在Picker 主服务器或 worker 的上下文中执行。

*Example*

```TypeScript
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProcessContext } from '@picker-cc/core';

@Injectable()
export class MyService implements OnApplicationBootstrap {
  constructor(private processContext: ProcessContext) {}

  onApplicationBootstrap() {
    if (this.processContext.isServer) {
      // 只在服务器进程中运行的代码
    }
  }
}
```

## Signature

```typescript
class ProcessContext {
  isServer: boolean
  isWorker: boolean
}
```
## Members

### isServer

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### isWorker

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


