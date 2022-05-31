---
date: 2022-04-27T09:22:19.042Z
title: "mergeConfig"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# mergeConfig


# mergeConfig

{% generationInfo "packages/core/src/config/merge-config.ts", "23", "@vendure/core" %}{% endgenerationInfo %}

Performs a deep merge of two PickerConfig objects. Unlike `Object.assign()` the `target` object is
not mutated, instead the function returns a new object which is the result of deeply merging the
values of `source` into `target`.

*Example*

```TypeScript
const result = mergeConfig(defaultConfig, {
  assetOptions: {
    uploadMaxFileSize: 5000,
  },
};
```

## Signature

```typescript
function mergeConfig<T extends PickerConfig>(target: T, source: PartialPickerConfig, depth:  = 0): T
```
## Parameters

### target

### source

### depth

