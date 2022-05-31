---
date: 2022-04-27T09:22:19.023Z
title: "AssetNamingStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AssetNamingStrategy


# AssetNamingStrategy

{% generationInfo "packages/core/src/config/asset-naming-strategy/asset-naming-strategy.ts", "8", "@vendure/core" %}{% endgenerationInfo %}

AssetNamingStrategy根据上传的源文件名确定如何生成文件名，
以及如何处理命名冲突。

## Signature

```typescript
interface AssetNamingStrategy {
  generateSourceFileName(originalFileName: string, conflictFileName?: string): string;
  generatePreviewFileName(sourceFileName: string, conflictFileName?: string): string;
}
```
## Members

### generateSourceFileName

{% memberInfo "method", "(originalFileName: string, conflictFileName?: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            给定上传文件的原始文件名，生成文件名到存储的服务器上。
像标准化的时间戳这样的操作可以用这种方法执行。

将检查输出是否与现有文件的命名冲突。如果一个检查到一个冲突 exists,
此方法将被再次调用，并传入第二个参数和一个新的、唯一的参数，然后生成文件名。
此过程将一直重复，直到出现唯一的文件名返回。

{% endmemberDescription %}

### generatePreviewFileName

{% memberInfo "method", "(sourceFileName: string, conflictFileName?: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            给定`generateSourceFileName`方法生成的源文件名,
此方法应该生成预览图像的文件名。

检查冲突的机制与上面描述的相同。

{% endmemberDescription %}


