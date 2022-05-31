---
date: 2022-04-27T09:22:19.069Z
title: "I18nService"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# I18nService


# I18nService

{% generationInfo "packages/core/src/i18n/i18n.service.ts", "40", "@vendure/core" %}{% endgenerationInfo %}



## Signature

```typescript
class I18nService implements OnModuleInit {
  addTranslationFile(langKey: string, filePath: string) => void;
  addTranslation(langKey: string, resources: PickerTranslationResources | any) => void;
}
```
## Implements

 * OnModuleInit


## Members

### addTranslationFile

{% memberInfo "method", "(langKey: string, filePath: string) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            添加一个基于 json 的 I18n 翻译文件

{% endmemberDescription %}

### addTranslation

{% memberInfo "method", "(langKey: string, resources: PickerTranslationResources | any) => void", '' %}{% endmemberInfo %}

{% memberDescription %}

            添加一个 I18n 转换 (key-value) 资源

{% endmemberDescription %}


