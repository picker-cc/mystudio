---
date: 2022-04-27T09:22:19.026Z
title: "AssetStorageStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# AssetStorageStrategy


# AssetStorageStrategy

{% generationInfo "packages/core/src/config/asset-storage-strategy/asset-storage-strategy.ts", "11", "@vendure/core" %}{% endgenerationInfo %}

The AssetPersistenceStrategy determines how Asset files are physically stored
and retrieved.

## Signature

```typescript
interface AssetStorageStrategy {
  writeFileFromBuffer(fileName: string, data: Buffer): Promise<string>;
  writeFileFromStream(fileName: string, data: Stream): Promise<string>;
  readFileToBuffer(identifier: string): Promise<Buffer>;
  readFileToStream(identifier: string): Promise<Stream>;
  fileExists(fileName: string): Promise<boolean>;
  toAbsoluteUrl?(reqest: Request, identifier: string): string;
}
```
## Members

### writeFileFromBuffer

{% memberInfo "method", "(fileName: string, data: Buffer) => Promise&#60;string&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### writeFileFromStream

{% memberInfo "method", "(fileName: string, data: Stream) => Promise&#60;string&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### readFileToBuffer

{% memberInfo "method", "(identifier: string) => Promise&#60;Buffer&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### readFileToStream

{% memberInfo "method", "(identifier: string) => Promise&#60;Stream&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### fileExists

{% memberInfo "method", "(fileName: string) => Promise&#60;boolean&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### toAbsoluteUrl

{% memberInfo "method", "(reqest: Request, identifier: string) => string", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


