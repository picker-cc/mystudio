---
date: 2022-04-27T09:22:19.037Z
title: "PickerLogger"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# PickerLogger


# PickerLogger

{% generationInfo "packages/core/src/config/logger/picker-logger.ts", "28", "@vendure/core" %}{% endgenerationInfo %}

The PickerLogger interface defines the shape of a logger service which may be provided in
the config.

## Signature

```typescript
interface PickerLogger {
  error(message: string, context?: string, trace?: string): void;
  warn(message: string, context?: string): void;
  info(message: string, context?: string): void;
  verbose(message: string, context?: string): void;
  debug(message: string, context?: string): void;
}
```
## Members

### error

{% memberInfo "method", "(message: string, context?: string, trace?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### warn

{% memberInfo "method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### info

{% memberInfo "method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### verbose

{% memberInfo "method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### debug

{% memberInfo "method", "(message: string, context?: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


