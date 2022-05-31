---
date: 2022-04-27T09:22:19.046Z
title: "AssetOptions"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AssetOptions


# AssetOptions

{% generationInfo "packages/core/src/config/picker-config.ts", "310", "@vendure/core" %}{% endgenerationInfo %}

AssetOptions 定义资产（图像和其他文件）如何命名和存储，以及预览图像如何生成。

**注意**: 如果你正在使用 `AssetServerPlugin`，无需配置这些选项。

## Signature

```typescript
interface AssetOptions {
  assetNamingStrategy: AssetNamingStrategy;
  assetStorageStrategy: AssetStorageStrategy;
  assetPreviewStrategy: AssetPreviewStrategy;
  permittedFileTypes?: string[];
  uploadMaxFileSize?: number;
}
```
## Members

### assetNamingStrategy

{% memberInfo "property", "AssetNamingStrategy", '' %}{% endmemberInfo %}

{% memberDescription %}

            定义在保存资产文和预览图像之前如何命名。

{% endmemberDescription %}

### assetStorageStrategy

{% memberInfo "property", "AssetStorageStrategy", '' %}{% endmemberInfo %}

{% memberDescription %}

            定义存储上传二进制文件的策略。

{% endmemberDescription %}

### assetPreviewStrategy

{% memberInfo "property", "AssetPreviewStrategy", '' %}{% endmemberInfo %}

{% memberDescription %}

            定义用于创建上传资产的预图像的策略。

{% endmemberDescription %}

### permittedFileTypes

{% memberInfo "property", "string[]", '' %}{% endmemberInfo %}

{% memberDescription %}

            i.e. either a file extension (".pdf") or a mime type ("image/*", "audio/mpeg" etc.).
允许作为资产上传的文件类型的数组。每个条目都应该是有效的
 [唯一的文件类型说明符](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)
 即文件扩展名(".pdf") 或一个 mime 类型 ("image/*", "audio/mpeg" 等)

{% endmemberDescription %}

### uploadMaxFileSize

{% memberInfo "property", "number", '' %}{% endmemberInfo %}

{% memberDescription %}

            上传资产的最大文件大小（字节）

{% endmemberDescription %}


