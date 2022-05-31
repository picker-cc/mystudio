---
date: 2022-04-27T09:22:19.024Z
title: "DefaultAssetNamingStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# DefaultAssetNamingStrategy


# DefaultAssetNamingStrategy

{% generationInfo "packages/core/src/config/asset-naming-strategy/default-asset-naming-strategy.ts", "12", "@vendure/core" %}{% endgenerationInfo %}

默认策略对文件名进行规范化，以删除不需要的字符和在冲突的情况下，增加一个计数器后缀.

## Signature

```typescript
class DefaultAssetNamingStrategy implements AssetNamingStrategy {
  generateSourceFileName(originalFileName: string, conflictFileName?: string) => string;
  generatePreviewFileName(sourceFileName: string, conflictFileName?: string) => string;
}
```
## Implements

 * AssetNamingStrategy


## Members

### generateSourceFileName

{% memberInfo "method", "(originalFileName: string, conflictFileName?: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### generatePreviewFileName

{% memberInfo "method", "(sourceFileName: string, conflictFileName?: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


