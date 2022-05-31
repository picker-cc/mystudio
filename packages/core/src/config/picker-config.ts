import { Options} from '@mikro-orm/core';
import { DynamicModule, Type } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { PluginDefinition } from 'apollo-server-core';
import { RequestHandler } from 'express';

import { AssetNamingStrategy } from './asset-naming-strategy/asset-naming-strategy';
import { AssetPreviewStrategy } from './asset-preview-strategy/asset-preview-strategy';
import { AssetStorageStrategy } from './asset-storage-strategy/asset-storage-strategy';
import Require = NodeJS.Require;
import { EntityIdStrategy } from './entity-id-strategy/entity-id-strategy';
// import { JobQueueStrategy } from './job-queue/job-queue-strategy';
import { PickerLogger } from './logger/picker-logger';
import {Middleware} from "../common";
import { ValidationContext } from 'graphql';
import {SessionCacheStrategy} from "./session-cache/session-cache-strategy";
import {PasswordHashingStrategy} from "./auth/password-hashing-strategy";
import {AuthenticationStrategy} from "./auth/authentication-strategy";
import {PermissionDefinition} from "../common/permission-definition";
// import {JobBufferStorageStrategy} from "../job-queue";
// import {LanguageCode} from "@picker-cc/common/lib/generated-types";
import {CustomFields} from "@picker-cc/common/lib/shared-types";
import {PasswordValidationStrategy} from "./auth/password-validation-strategy";

/**
 * @description
 * ApiOptions定义了如何公开的Picker GraphQL API，以及允许API层与中间件扩展。
 *
 * @docsCategory configuration
 */
export interface ApiOptions {
    /**
     * @description
     * 设置服务器主机名。如果没有设置，则使用 localhost
     *
     * @default ''
     */
    hostname?: string;
    /**
     * @description
     * Picker服务器应该监听哪个端口。
     *
     * @default 3000
     */
    port: number;
    /**
     * @description
     * Admin GraphQL API 的路径。
     * @default 'admin-api'
     */
    adminApiPath?: string;

    /**
     * @description
     * Studio GraphQL API 的路径。
     * @default 'studio-api'
     */
    studioApiPath?: string;

    /**
     * @description
     * 是否开启 Admin GraphQL API playground
     * [ApolloServer playground](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructoroptions-apolloserver).
     *
     * @default false
     */
    adminApiPlayground?: boolean | any;

    /**
     * @description
     * 是否开启 Studio GraphQL API playground
     * [ApolloServer playground](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructoroptions-apolloserver).
     *
     * @default false
     */
    studioApiPlayground?: boolean | any;

    /**
     * @description
     * 是否开启 Admin GraphQL API Debug
     * [ApolloServer playground](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructoroptions-apolloserver).
     *
     * @default false
     */
    adminApiDebug?: boolean;

    /**
     * @description
     * 是否开启 Studio GraphQL API Debug
     * [ApolloServer playground](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructoroptions-apolloserver).
     *
     * @default false
     */
    studioApiDebug?: boolean;

    /**
     * @description
     * 返回 `PaginatedList` 响应的查询可能返回的最大条目数。换句话说，这是 `take` 输入选项的上限。
     *
     * @default 100
     */
    studioListQueryLimit?: number;
    /**
     * @description
     * 返回 `PaginatedList` 响应的查询可能返回的最大条目数。换句话说，这是 `take` 输入选项的上限。
     *
     * @default 1000
     */
    adminListQueryLimit?: number;

    /**
     * @description
     * 在验证管理GraphQL API的模式时，使用作为额外验证规则的自定义函数
     * [ApolloServer validation rules](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#validationrules).
     *
     * @default []
     */
    adminApiValidationRules?: Array<(context: ValidationContext) => any>;
    /**
     * @description
     * 在验证管理GraphQL API的模式时，使用作为额外验证规则的自定义函数
     * [ApolloServer validation rules](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#validationrules).
     *
     * @default []
     */
    studioApiValidationRules?: Array<(context: ValidationContext) => any>;

    /**
     * @description
     * 是否开启Server CORS 跨域。
     * 详见：[express CORS docs](https://github.com/expressjs/cors#configuration-options)
     */
    cors?: boolean | CorsOptions;
    /**
     * @description
     * 自定义的Express 或 NestJS 中间件
     *
     * @default []
     */
    middleware?: Middleware[];
    /**
     * @description
     * 自定义[ApolloServerPlugins](https://www.apollographql.com/docs/apollo-server/integrations/plugins/)，
     * 它允许 Apollo 服务器的扩展，这是底层的GraphQL服务器由Picker使用。
     ＊
     * Apollo插件可以用于对输入操作或输出数据执行自定义数据转换。
     *
     * @default []
     */
    apolloServerPlugins?: PluginDefinition[];

    /**
     * 控制是否启用GraphQL api的自检。对于生产环境，建议禁用
     * 自省，因为暴露整个模式可以让攻击者轻松地了解所有操作
     * 并且更容易找到任何潜在的可利用查询。
     *
     * **注意:**当内省被禁用时，工具依赖于它的事情，如自动完成将不会工作。
     * @example
     * ```TypeScript
     * {
     *   introspection: process.env.NODE_ENV !== 'studioion'
     * }
     * ```
     *
     * @default true
     */
    introspection?: boolean;
}

/**
 * @description
 * 用于跟踪会话的cookie处理选项(仅适用于 `authOptions.tokenMethod` 被设置为 `cookie` )。这些选项被直接传递给Express
 *  [cookie-session中间件](https://github.com/expressjs/cookie-session)。
 *
 * @docsCategory auth
 */
export interface CookieOptions {
    /**
     * @description
     * 要设置的cookie的名称。
     *
     * @default 'session'
     */
    name?: string;

    /**
     * @description
     * 用于为经过认证的用户签名会话cookie的秘密。只应用tokenMethod设置为cookie。
     ＊
     * 在生产应用程序中，出于安全原因，它不应该作为字符串存储在源代码控制中，但可以从不在源代码控制下的外部文件加载，或者从环境变量加载。
     *
     * @default (随机字符串)
     */
    secret?: string;

    /**
     * @description
     * 一个表示cookie路径的字符串。
     *
     * @default '/'
     */
    path?: string;

    /**
     * @description
     * 一个表示cookie的域的字符串(无默认值)。
     */
    domain?: string;

    /**
     * @description
     * *一个布尔值或字符串，指示cookie是否为"same site" cookie(默认为false)。可以设置为'strict'，
     * 'lax'， 'none'，或true(映射到'strict')。
     * Cookie 的 SameSite 属性用来限制第三方 Cookie，从而减少安全风险。
     * * `Strict` 严格模式，完全禁止第三方 Cookie，任何情况下都不会发送 Cookie。只有当前网页的 URL 与请求目标一致，才会带上 Cookie
     * @default false
     */
    sameSite?: 'strict' | 'lax' | 'none' | boolean;

    /**
     * @description
     * 一个布尔值，表示 cookie 是否只通过 HTTPS 发送(HTTP 黑夜为 false，HTTPS默认为 true)
     */
    secure?: boolean;

    /**
     * @description
     * 一个布尔值，表示 cookie 是否只通过 HTTPS 发送（如果节点进程中没有处理 SSL，则使用此值）
     */
    secureProxy?: boolean;

    /**
     * @description
     * 一个布尔值，表示 cookie 是否只通过 HTTP(S)，而不是提供给客户端 JavaScript（默认为 true)
     *
     * @default true
     */
    httpOnly?: boolean;

    /**
     * @description
     * 一个布尔值，表示是否要签名cookie（默认为true）。如果为 true，另一个与 .sig 同名的 cookie 附加的后缀也会被发送，
     * 包含带有一个 27字节的 url 安全的 base64 SHA1 值，表示 cookie-name=cookie-value 针对第一个 Keygrip。
     * 此签名密钥用于在下次收到 cookie 时检测篡改。
     */
    signed?: boolean;

    /**
     * @description
     * 一个布尔值，指示是否覆盖以前设置的相同名称的 cookie （默认为true）。
     * 如果为 true，所有 cookie 设置期间当设置 cookie 时，具有相同名称的相同请求（无论路径或域）会被 Set-Cookie 头过滤掉。
     */
    overwrite?: boolean;
}

export interface AuthOptions {
    /**
     * @description
     * 禁用身份验证和权限检查。
     * 不要在生产中设置为真
     * 仅为协助开发使用
     *
     * @default false
     */
    disableAuth?: boolean;

    /**
     * @description
     * 可以根据需求添加其他 token 方法，如 cookie
     * “authTokenHeaderKey”在服务器的CORS配置中(添加 Control-Expose-Headers: :picker-auth-token”)
     * @default 'cookie'
     */
    tokenMethod?: 'cookie' | 'bearer' | ReadonlyArray<'cookie' | 'bearer'>;
    /**
     * @description
     */
    cookieOptions?: CookieOptions;
    /**
     * 设置header属性，该属性将在使用'bearer'方法时用于发送验证令牌。
     * @default 'picker-auth-token'
     */
    authTokenHeaderKey?: string;
    /**
     * @description
     * 会话持续时间，即从最后一次认证 authenticted 请求到用户必须重新 re-authenticate 认证的时间。
     * 表示为每[zeit/ms]的时间跨度字符串(https://github.com/zeit/ms.js)。
     *
     * 例如: `60`，`'2 days'`，`'10h'`，`'7h'`
     * @default '1y'
     */
    sessionDuration?: string | number;

    /**
     * @description
     * 这个策略定义了会话的缓存方式。默认情况下，会话使用 simple（内存缓存策略）模式进行缓存，
     * 适用于开发和低流量、单实例部署。
     *
     * @default InMemorySessionCacheStrategy
     */
    sessionCacheStrategy?: SessionCacheStrategy;

    /**
     * @description
     * 会话缓存中给定条目的 "存活时间（time to live）"。这决定了缓存条目在被认为"过时"并被从数据库中获取的新数据替换之前
     * 被保留的时间长度（单位：秒）
     *
     * @default 300
     */
    sessionCacheTTL?: number;

    /**
     * @description
     * 确定新用户帐户是否需要验证他们的电子邮件地址。
     * 如果设置为 true， 则在登录再次验证时抛出错误
     *
     * @default true
     */
    requireVerification?: boolean;
    /**
     * @description
     * 设置验证令牌有效的时间长度，之后必须刷新验证令牌。
     *
     * 使用字符串描述每个时间跨度
     * [zeit/ms](https://github.com/zeit/ms.js).  Eg: `60`, `'2 days'`, `'10h'`, `'7d'`
     *
     * @default '7d'
     */
    verificationTokenDuration?: string | number;

    /**
     * @description
     * 用于创建超级管理员凭证的配置
     */
    superadminCredentials?: SuperadminCredentials;

    /**
     * @description
     *
     * 配置一个或多个 AuthenticationStrategy，它定义了如何在 AdminAPI 中处理身份验证。
     * @default NativeAuthenticationStrategy
     */
    adminAuthenticationStrategy?: AuthenticationStrategy[];

    /**
     * @description
     * 配置一个或多个AuthenticationStrategies，它定义如何在Studio API中处理身份验证。
     *
     * @default NativeAuthenticationStrategy
     */
    studioAuthenticationStrategy?: AuthenticationStrategy[];

    /**
     * @description
     * 允许定义自定义权限，这可以用来限制访问自定义的 GraphQL 解析器在插件中定义
     *
     * @default []
     */
    customPermissions?: PermissionDefinition[];

    /**
     * @description
     * 允许定制密码为 Hash 策略时使用 {@link NativeAuthenticationStrategy}
     *
     * @default BcryptPasswordHashingStrategy
     */
    passwordHashingStrategy?: PasswordHashingStrategy;
    /**
     * @description
     * 允许在命名用{@link NativeAuthenticationStrategy} 时设置自定义密码策略。
     * 黑夜情况下，它使用{@link DefaultPasswordValidationStrategy},这将规定一个最小长度四个字符。
     * 为了提高安全性，建议指定一个更严格的策略，例如：
     *
     * @example
     * ```ts
     * {
     *   passwordValidationStrategy: new DefaultPasswordValidationStrategy({
     *     // 包含至少8个字符、至少一个字母和一个数字
     *     regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
     *   }),
     * }
     * ```
     *
     * @default DefaultPasswordValidationStrategy
     */
    passwordValidationStrategy?: PasswordValidationStrategy;
}

/**
 * @description
 * AssetOptions 定义资产（图像和其他文件）如何命名和存储，以及预览图像如何生成。
 *
 * **注意**: 如果你正在使用 `AssetServerPlugin`，无需配置这些选项。
 *
 * @docsCategory assets
 * */
export interface AssetOptions {
    /**
     * @description
     * 定义在保存资产文和预览图像之前如何命名。
     * @default DefaultAssetNamingStrategy
     */
    assetNamingStrategy: AssetNamingStrategy;
    /**
     * @description
     * 定义存储上传二进制文件的策略。
     * @default NoAssetStorageStrategy
     */
    assetStorageStrategy: AssetStorageStrategy;
    /**
     * @description
     * 定义用于创建上传资产的预图像的策略。
     * @default NoAssetPreviewStrategy
     */
    assetPreviewStrategy: AssetPreviewStrategy;
    /**
     * @description
     * i.e. either a file extension (".pdf") or a mime type ("image/*", "audio/mpeg" etc.).
     * 允许作为资产上传的文件类型的数组。每个条目都应该是有效的
     *  [唯一的文件类型说明符](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)
     *  即文件扩展名(".pdf") 或一个 mime 类型 ("image/*", "audio/mpeg" 等)
     *
     * @default image, audio, video MIME types plus PDFs
     */
    permittedFileTypes?: string[];
    /**
     * @description
     * 上传资产的最大文件大小（字节）
     * @default 20971520
     */
    uploadMaxFileSize?: number;
}

/**
 * @description
 * 这些凭证将用于创建超级管理员用户
 * 当系统第一次启动时生成。
 *
 * @docsCategory auth
 */
export interface SuperadminCredentials {
    /**
     * @description
     * The identifier to be used to create a superadmin account
     * @default 'superadmin'
     */
    identifier: string;

    /**
     * @description
     * The password to be used to create a superadmin account
     * @default 'superadmin'
     */
    password: string;
}

// /**
//  * @docCategory orders
//  * @docsPage OrderOptions
//  */
// export interface OrderOptions {
//
// }

export interface CloudStorageOption {
    accessKey: string; // 'cloudstorage access key for cloud storage',
    secretKey: string; // 'cloudstorage secret key for cloud storage',
}

export interface CloudStorageAliOption extends CloudStorageOption {
    aliyunAcsARN: string; // 'aliyun Acs ARN, like: acs:ram::xxx:role/xxx',
}

/**
 * @description
 * 内置队列的配置选项
 *
 * @docsCategory JobQueue
 */
export interface JobQueueOptions {
    /**
     * @description
     * 定义如何持久化和访问队列中的任务。
     *
     * @default InMemoryJobQueueStrategy
     */
    // jobQueueStrategy?: JobQueueStrategy;
    // jobBufferStorageStrategy?: JobBufferStorageStrategy;

    /**
     * @description
     * 定义将在此进程中运行的队列
     * 这可以用来配置仅某些队列在此进程中运行
     * 如果它是空的，所有队列将运行
     */
    activeQueues?: string[];
}

/**
 * @description
 * 与实体的内部处理有关的选项。
 *
 * @docsCategory configuration
 */
export interface EntityOptions {
    /**
     * @description
     * 定义在数据库中存储实体的主键的策略，以及通过 API 暴露实体时对这些 id 和编码解码。
     * 黑夜值使用一个简单的自动递增整数策略。
     *
     // * @default AutoIncrementIdStrategy
     * @default AutoIncrementIdStrategy
     */
    entityIdStrategy?: EntityIdStrategy<any>;
    /**
     * @description
     * 区域缓存在内存中，因为它们被频繁访问。这个设置决定了缓存的生存时间（以 ms 为单位），
     * 直到它被认为是旧的。对于多实例部署（例如无服务器、负载平衡），这里的一个较小的值将防止实例之间的数据不一致。
     * @default 30000
     */
    zoneCacheTtl?: number;
}

export interface PickerConfig {
    /**
     * 配置 APIs，包含 hostname, port, CORS 设置
     */
    apiOptions: ApiOptions;

    /**
     * @description
     * 处理资产的配置
     */
    assetOptions?: AssetOptions;

    /**
     * @description
     *
     * 权限 配置
     */
    authOptions: AuthOptions;

    /**
     * @description
     * 连接选项使用 MikroORM 连接到数据库
     */
    dbConnectionOptions?: Options;

    /**
     * @description
     * 默认的应用语言编码 languageCode
     * @default LanguageCode.zh
     */
    // defaultLanguageCode?: LanguageCode;

    /**
     * @description
     * 定义在数据库中存储实体的主键的策略，
     * 以及通过 API 暴露实体时对这些 id 的编码和解码。
     * 黑夜值使用一个简单的自动递增整数策略。
     *
     * @default AutoIncrementIdStrategy
     */
    entityIdStrategy?: EntityIdStrategy<any>;

    /**
     * @description
     * An array of plugins.
     *
     * @default []
     */
    plugins?: Array<DynamicModule | Type<any>>;

    /**
     * @description
     * 提供一个 {@link PickerLogger} 的接口实现类
     *
     * @default DefaultLogger
     */
    logger?: PickerLogger;

    /**
     * @description
     * 配置如何持久化和处理作业队列
     */
    jobQueueOptions?: JobQueueOptions;
}

/**
 * @description
 * 该接口表示在运行时可用的 PickerConfig 对象，即用户提供的对象
 * 配置值已经与{@link defaultConfig}值合并。
 *
 * @docsCategory configuration
 * @docsPage Configuration
 */
export interface RuntimePickerConfig extends Required<PickerConfig> {
    apiOptions: Required<ApiOptions>;
    assetOptions: Required<AssetOptions>;
    authOptions: Required<AuthOptions>;
    customFields: Required<CustomFields>;
    // entityOptions: Required<Omit<EntityOptions, 'entityIdStrategy'>> & EntityOptions;
    jobQueueOptions: Required<JobQueueOptions>;
}

type DeepPartialSimple<T> = {
    [P in keyof T]?:
        | null
        | (T[P] extends Array<infer U>
              ? Array<DeepPartialSimple<U>>
              : T[P] extends ReadonlyArray<infer X>
              ? ReadonlyArray<DeepPartialSimple<X>>
              : T[P] extends Type<any>
              ? T[P]
              : DeepPartialSimple<T[P]>);
};

export type PartialPickerConfig = DeepPartialSimple<PickerConfig>;

