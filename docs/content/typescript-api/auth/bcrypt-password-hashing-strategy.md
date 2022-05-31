---
date: 2022-04-27T09:22:19.028Z
title: "BcryptPasswordHashingStrategy"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# BcryptPasswordHashingStrategy


# BcryptPasswordHashingStrategy

{% generationInfo "packages/core/src/config/auth/bcrypt-password-hashing-strategy.ts", "10", "@vendure/core" %}{% endgenerationInfo %}

使用 bcrypt (https://en.wikipedia.org/wiki/Bcrypt) 来散列明文密码字符串的哈希策略。

## Signature

```typescript
class BcryptPasswordHashingStrategy implements PasswordHashingStrategy {
  constructor()
  hash(plaintext: string) => Promise<string>;
  check(plaintext: string, hash: string) => Promise<boolean>;
}
```
## Implements

 * PasswordHashingStrategy


## Members

### constructor

{% memberInfo "method", "() => BcryptPasswordHashingStrategy", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### hash

{% memberInfo "method", "(plaintext: string) => Promise&#60;string&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}

### check

{% memberInfo "method", "(plaintext: string, hash: string) => Promise&#60;boolean&#62;", '' %}{% endmemberInfo %}

{% memberDescription %}

            

{% endmemberDescription %}


