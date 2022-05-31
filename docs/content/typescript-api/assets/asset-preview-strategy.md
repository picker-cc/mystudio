---
date: 2022-04-27T09:22:19.025Z
title: "AssetPreviewStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AssetPreviewStrategy


# AssetPreviewStrategy

{% generationInfo "packages/core/src/config/asset-preview-strategy/asset-preview-strategy.ts", "14", "@vendure/core" %}{% endgenerationInfo %}

AssetPreviewStrategy决定如何创建资产的预览图像。的图像
资产，这通常涉及到调整到合理的尺寸。其他文件类型
可以用多种方式预览，例如:
-为音频文件生成的波形图像
-预览为pdf文件生成的图像
-水印添加到预览图像

## Signature

```typescript
interface AssetPreviewStrategy {
  generatePreviewImage(mimeType: string, data: Buffer): Promise<Buffer>;
}
```
## Members

### generatePreviewImage

{% memberInfo "method", "(mimeType: string, data: Buffer) => Promise&#60;Buffer&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


