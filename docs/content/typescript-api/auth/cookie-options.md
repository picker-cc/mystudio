---
date: 2022-04-27T09:22:19.044Z
title: "CookieOptions"
layout: content.njk
---
[comment]: <> (这个文件是从 PickerCC 源码中生，不要修改。请使用 "docs:build" 脚本命令生成。)

# CookieOptions


# CookieOptions

{% generationInfo "packages/core/src/config/picker-config.ts", "118", "@vendure/core" %}{% endgenerationInfo %}

用于跟踪会话的cookie处理选项(仅适用于 `authOptions.tokenMethod` 被设置为 `cookie` )。这些选项被直接传递给Express
 [cookie-session中间件](https://github.com/expressjs/cookie-session)。

## Signature

```typescript
interface CookieOptions {
  name?: string;
  secret?: string;
  path?: string;
  domain?: string;
  sameSite?: 'strict' | 'lax' | 'none' | boolean;
  secure?: boolean;
  secureProxy?: boolean;
  httpOnly?: boolean;
  signed?: boolean;
  overwrite?: boolean;
}
```
## Members

### name

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            要设置的cookie的名称。

{% endmemberDescription %}

### secret

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            用于为经过认证的用户签名会话cookie的秘密。只应用tokenMethod设置为cookie。
＊
在生产应用程序中，出于安全原因，它不应该作为字符串存储在源代码控制中，但可以从不在源代码控制下的外部文件加载，或者从环境变量加载。

{% endmemberDescription %}

### path

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个表示cookie路径的字符串。

{% endmemberDescription %}

### domain

{% memberInfo "property", "string", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个表示cookie的域的字符串(无默认值)。

{% endmemberDescription %}

### sameSite

{% memberInfo "property", "'strict' | 'lax' | 'none' | boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            *一个布尔值或字符串，指示cookie是否为"same site" cookie(默认为false)。可以设置为'strict'，
'lax'， 'none'，或true(映射到'strict')。
Cookie 的 SameSite 属性用来限制第三方 Cookie，从而减少安全风险。
* `Strict` 严格模式，完全禁止第三方 Cookie，任何情况下都不会发送 Cookie。只有当前网页的 URL 与请求目标一致，才会带上 Cookie

{% endmemberDescription %}

### secure

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个布尔值，表示 cookie 是否只通过 HTTPS 发送(HTTP 黑夜为 false，HTTPS默认为 true)

{% endmemberDescription %}

### secureProxy

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个布尔值，表示 cookie 是否只通过 HTTPS 发送（如果节点进程中没有处理 SSL，则使用此值）

{% endmemberDescription %}

### httpOnly

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个布尔值，表示 cookie 是否只通过 HTTP(S)，而不是提供给客户端 JavaScript（默认为 true)

{% endmemberDescription %}

### signed

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个布尔值，表示是否要签名cookie（默认为true）。如果为 true，另一个与 .sig 同名的 cookie 附加的后缀也会被发送，
包含带有一个 27字节的 url 安全的 base64 SHA1 值，表示 cookie-name=cookie-value 针对第一个 Keygrip。
此签名密钥用于在下次收到 cookie 时检测篡改。

{% endmemberDescription %}

### overwrite

{% memberInfo "property", "boolean", '' %}{% endmemberInfo %}

{% memberDescription %}

            一个布尔值，指示是否覆盖以前设置的相同名称的 cookie （默认为true）。
如果为 true，所有 cookie 设置期间当设置 cookie 时，具有相同名称的相同请求（无论路径或域）会被 Set-Cookie 头过滤掉。

{% endmemberDescription %}


