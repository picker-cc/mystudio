---
date: 2022-04-27T09:22:19.038Z
title: "Logger"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# Logger


# Logger

{% generationInfo "packages/core/src/config/logger/picker-logger.ts", "106", "@vendure/core" %}{% endgenerationInfo %}

The Logger is responsible for all logging in a Vendure application.

It is intended to be used as a static class:

*Example*

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

*Example*

```ts
import { PickerLogger } from '@vendure/core';
import fs from 'fs';

// A simple custom logger which writes all logs to a file.
export class SimpleFileLogger implements PickerLogger {
    private logfile: fs.WriteStream;

    constructor(logfileLocation: string) {
        this.logfile = fs.createWriteStream(logfileLocation, { flags: 'w' });
    }

    error(message: string, context?: string) {
        this.logfile.write(`ERROR: [${context}] ${message}\n`);
    }
    warn(message: string, context?: string) {
        this.logfile.write(`WARN: [${context}] ${message}\n`);
    }
    info(message: string, context?: string) {
        this.logfile.write(`INFO: [${context}] ${message}\n`);
    }
    verbose(message: string, context?: string) {
        this.logfile.write(`VERBOSE: [${context}] ${message}\n`);
    }
    debug(message: string, context?: string) {
        this.logfile.write(`DEBUG: [${context}] ${message}\n`);
    }
}

// in the VendureConfig
export const config = {
    // ...
    logger: new SimpleFileLogger('server.log'),
}
```

## Signature

```typescript
class Logger implements LoggerService {
  static logger: PickerLogger
  static error(message: string, context?: string, trace?: string) => void;
  static warn(message: string, context?: string) => void;
  static info(message: string, context?: string) => void;
  static verbose(message: string, context?: string) => void;
  static debug(message: string, context?: string) => void;
}
```
## Implements

 * LoggerService


## Members

### logger

{% memberInfo "static property", "PickerLogger", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### error

{% memberInfo "static method", "(message: string, context?: string, trace?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### warn

{% memberInfo "static method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### info

{% memberInfo "static method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### verbose

{% memberInfo "static method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### debug

{% memberInfo "static method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


