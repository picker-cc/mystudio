// tslint:disable
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum AdjustmentType {
  DISTRIBUTED_ORDER_PROMOTION = 'DISTRIBUTED_ORDER_PROMOTION',
  OTHER = 'OTHER',
  PROMOTION = 'PROMOTION'
}

export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime'];
  fileSize: Scalars['Int'];
  focalPoint?: Maybe<Coordinate>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  name: Scalars['String'];
  preview: Scalars['String'];
  source: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: AssetType;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export enum AssetType {
  BINARY = 'BINARY',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  strategy: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BooleanOperators = {
  eq?: InputMaybe<Scalars['Boolean']>;
};

/** 评论状态 */
export enum CommentState {
  /** 待审核 */
  AUDITING = 'AUDITING',
  /** 审核发布 */
  PUBLISH = 'PUBLISH',
  /** 垃圾评论 */
  SPAM = 'SPAM'
}

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  defaultValue?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  /** 实际值的JSON字符串化表示 */
  value: Scalars['String'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  args: Array<ConfigArg>;
  code: Scalars['String'];
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  args: Array<ConfigArgDefinition>;
  code: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  code: Scalars['String'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  permissions: Array<Permission>;
  token: Scalars['String'];
};

export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']>;
};

export type DateRange = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  message?: Maybe<Scalars['String']>;
  result: DeletionResult;
};

export enum DeletionResult {
  /** 实体删除成功 */
  DELETED = 'DELETED',
  /** 未删除，原因请见消息描述 */
  NOT_DELETED = 'NOT_DELETED'
}

/** 作品的价格配置 */
export type DiffPriceOption = {
  __typename?: 'DiffPriceOption';
  /** 定价的信息描述 */
  info?: Maybe<Scalars['String']>;
  /** 售价 */
  price: Scalars['Float'];
  /** 价格的版本名称 */
  versionName?: Maybe<Scalars['String']>;
};

/** 电子邮箱地址冲突时返回 */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum GlobalFlag {
  FALSE = 'FALSE',
  INHERIT = 'INHERIT',
  TRUE = 'TRUE'
}

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** 如果用户身份验证凭证无效则返回 */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  authenticationError: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum JobState {
  /** 取消 */
  CANCELLED = 'CANCELLED',
  /** 已完成 */
  COMPLETED = 'COMPLETED',
  /** 错误 */
  FAILED = 'FAILED',
  /** 等待 */
  PENDING = 'PENDING',
  /** 重试 */
  RETRYING = 'RETRYING',
  /** 运行 */
  RUNNING = 'RUNNING'
}

/**
 * @description
 * 具有可选区域或脚本修饰符的（例如 de_AT）的 ISO 639-1 语言代码形式。
 * 可用于选择基于 [Unicode CLDR 描述列表](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)，
 * 包括了世界上主要的标准语言和方言
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  af = 'af',
  /** Akan */
  ak = 'ak',
  /** Amharic */
  am = 'am',
  /** Arabic */
  ar = 'ar',
  /** Assamese */
  as = 'as',
  /** Azerbaijani */
  az = 'az',
  /** Belarusian */
  be = 'be',
  /** Bulgarian */
  bg = 'bg',
  /** Bambara */
  bm = 'bm',
  /** Bangla */
  bn = 'bn',
  /** Tibetan */
  bo = 'bo',
  /** Breton */
  br = 'br',
  /** Bosnian */
  bs = 'bs',
  /** Catalan */
  ca = 'ca',
  /** Chechen */
  ce = 'ce',
  /** Corsican */
  co = 'co',
  /** Czech */
  cs = 'cs',
  /** Church Slavic */
  cu = 'cu',
  /** Welsh */
  cy = 'cy',
  /** Danish */
  da = 'da',
  /** German */
  de = 'de',
  /** Austrian German */
  de_AT = 'de_AT',
  /** Swiss High German */
  de_CH = 'de_CH',
  /** Dzongkha */
  dz = 'dz',
  /** Ewe */
  ee = 'ee',
  /** Greek */
  el = 'el',
  /** English */
  en = 'en',
  /** Australian English */
  en_AU = 'en_AU',
  /** Canadian English */
  en_CA = 'en_CA',
  /** British English */
  en_GB = 'en_GB',
  /** American English */
  en_US = 'en_US',
  /** Esperanto */
  eo = 'eo',
  /** Spanish */
  es = 'es',
  /** European Spanish */
  es_ES = 'es_ES',
  /** Mexican Spanish */
  es_MX = 'es_MX',
  /** Estonian */
  et = 'et',
  /** Basque */
  eu = 'eu',
  /** Persian */
  fa = 'fa',
  /** Dari */
  fa_AF = 'fa_AF',
  /** Fulah */
  ff = 'ff',
  /** Finnish */
  fi = 'fi',
  /** Faroese */
  fo = 'fo',
  /** French */
  fr = 'fr',
  /** Canadian French */
  fr_CA = 'fr_CA',
  /** Swiss French */
  fr_CH = 'fr_CH',
  /** Western Frisian */
  fy = 'fy',
  /** Irish */
  ga = 'ga',
  /** Scottish Gaelic */
  gd = 'gd',
  /** Galician */
  gl = 'gl',
  /** Gujarati */
  gu = 'gu',
  /** Manx */
  gv = 'gv',
  /** Hausa */
  ha = 'ha',
  /** Hebrew */
  he = 'he',
  /** Hindi */
  hi = 'hi',
  /** Croatian */
  hr = 'hr',
  /** Haitian Creole */
  ht = 'ht',
  /** Hungarian */
  hu = 'hu',
  /** Armenian */
  hy = 'hy',
  /** Interlingua */
  ia = 'ia',
  /** Indonesian */
  id = 'id',
  /** Igbo */
  ig = 'ig',
  /** Sichuan Yi */
  ii = 'ii',
  /** Icelandic */
  is = 'is',
  /** Italian */
  it = 'it',
  /** Japanese */
  ja = 'ja',
  /** Javanese */
  jv = 'jv',
  /** Georgian */
  ka = 'ka',
  /** Kikuyu */
  ki = 'ki',
  /** Kazakh */
  kk = 'kk',
  /** Kalaallisut */
  kl = 'kl',
  /** Khmer */
  km = 'km',
  /** Kannada */
  kn = 'kn',
  /** Korean */
  ko = 'ko',
  /** Kashmiri */
  ks = 'ks',
  /** Kurdish */
  ku = 'ku',
  /** Cornish */
  kw = 'kw',
  /** Kyrgyz */
  ky = 'ky',
  /** Latin */
  la = 'la',
  /** Luxembourgish */
  lb = 'lb',
  /** Ganda */
  lg = 'lg',
  /** Lingala */
  ln = 'ln',
  /** Lao */
  lo = 'lo',
  /** Lithuanian */
  lt = 'lt',
  /** Luba-Katanga */
  lu = 'lu',
  /** Latvian */
  lv = 'lv',
  /** Malagasy */
  mg = 'mg',
  /** Maori */
  mi = 'mi',
  /** Macedonian */
  mk = 'mk',
  /** Malayalam */
  ml = 'ml',
  /** Mongolian */
  mn = 'mn',
  /** Marathi */
  mr = 'mr',
  /** Malay */
  ms = 'ms',
  /** Maltese */
  mt = 'mt',
  /** Burmese */
  my = 'my',
  /** Norwegian Bokmål */
  nb = 'nb',
  /** North Ndebele */
  nd = 'nd',
  /** Nepali */
  ne = 'ne',
  /** Dutch */
  nl = 'nl',
  /** Flemish */
  nl_BE = 'nl_BE',
  /** Norwegian Nynorsk */
  nn = 'nn',
  /** Nyanja */
  ny = 'ny',
  /** Oromo */
  om = 'om',
  /** Odia */
  or = 'or',
  /** Ossetic */
  os = 'os',
  /** Punjabi */
  pa = 'pa',
  /** Polish */
  pl = 'pl',
  /** Pashto */
  ps = 'ps',
  /** Portuguese */
  pt = 'pt',
  /** Brazilian Portuguese */
  pt_BR = 'pt_BR',
  /** European Portuguese */
  pt_PT = 'pt_PT',
  /** Quechua */
  qu = 'qu',
  /** Romansh */
  rm = 'rm',
  /** Rundi */
  rn = 'rn',
  /** Romanian */
  ro = 'ro',
  /** Moldavian */
  ro_MD = 'ro_MD',
  /** Russian */
  ru = 'ru',
  /** Kinyarwanda */
  rw = 'rw',
  /** Sanskrit */
  sa = 'sa',
  /** Sindhi */
  sd = 'sd',
  /** Northern Sami */
  se = 'se',
  /** Sango */
  sg = 'sg',
  /** Sinhala */
  si = 'si',
  /** Slovak */
  sk = 'sk',
  /** Slovenian */
  sl = 'sl',
  /** Samoan */
  sm = 'sm',
  /** Shona */
  sn = 'sn',
  /** Somali */
  so = 'so',
  /** Albanian */
  sq = 'sq',
  /** Serbian */
  sr = 'sr',
  /** Southern Sotho */
  st = 'st',
  /** Sundanese */
  su = 'su',
  /** Swedish */
  sv = 'sv',
  /** Swahili */
  sw = 'sw',
  /** Congo Swahili */
  sw_CD = 'sw_CD',
  /** Tamil */
  ta = 'ta',
  /** Telugu */
  te = 'te',
  /** Tajik */
  tg = 'tg',
  /** Thai */
  th = 'th',
  /** Tigrinya */
  ti = 'ti',
  /** Turkmen */
  tk = 'tk',
  /** Tongan */
  to = 'to',
  /** Turkish */
  tr = 'tr',
  /** Tatar */
  tt = 'tt',
  /** Uyghur */
  ug = 'ug',
  /** Ukrainian */
  uk = 'uk',
  /** Urdu */
  ur = 'ur',
  /** Uzbek */
  uz = 'uz',
  /** Vietnamese */
  vi = 'vi',
  /** Volapük */
  vo = 'vo',
  /** Wolof */
  wo = 'wo',
  /** Xhosa */
  xh = 'xh',
  /** Yiddish */
  yi = 'yi',
  /** Yoruba */
  yo = 'yo',
  /** Chinese */
  zh = 'zh',
  /** Simplified Chinese */
  zh_Hans = 'zh_Hans',
  /** Traditional Chinese */
  zh_Hant = 'zh_Hant',
  /** Zulu */
  zu = 'zu'
}

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR'
}

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Scalars['JSON']>;
  logout: Success;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};

/** 名字冲突错误 */
export type NameConflictError = ErrorResult & {
  __typename?: 'NameConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** 如果未配置该策略，则在尝试依赖 NativeAuthStrategy 的操作时返回 */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
};

export type NumberRange = {
  end: Scalars['Float'];
  start: Scalars['Float'];
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  __typename?: 'PasswordValidationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  validationErrorMessage: Scalars['String'];
};

/**
 * @description
 * 管理员和客户权限。用于通过 {@link Allow} 装饰器控制对 GraphQL 解析器的访问
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated 仅意味着用户已经登录 */
  Authenticated = 'Authenticated',
  /** 授权限给 create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** 授权限给 create Asset */
  CreateAsset = 'CreateAsset',
  /** 授权限给 create Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** 授权限给 create Product */
  CreateProduct = 'CreateProduct',
  /** 授权限给 create System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** 授权限给 create System */
  CreateSystem = 'CreateSystem',
  /** 授权限给 create Tag */
  CreateTag = 'CreateTag',
  /** 授权限给 delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** 授权限给 delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** 授权限给 delete Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** 授权限给 delete Product */
  DeleteProduct = 'DeleteProduct',
  /** 授权限给 delete System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** 授权限给 delete System */
  DeleteSystem = 'DeleteSystem',
  /** 授权限给 delete Tag */
  DeleteTag = 'DeleteTag',
  /** Owner 指用户拥有该实体，例如客户自己的订单 */
  Owner = 'Owner',
  /** Public 表示任何未经身份验证的用户都可能执行该操作 */
  Public = 'Public',
  /** 授权限给 read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** 授权限给 read Asset */
  ReadAsset = 'ReadAsset',
  /** 授权限给 read Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** 授权限给 read Product */
  ReadProduct = 'ReadProduct',
  /** 授权限给 read System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** 授权限给 read System */
  ReadSystem = 'ReadSystem',
  /** 授权限给 read Tag */
  ReadTag = 'ReadTag',
  /** SuperAdmin 可以不受限制地进入所有操作 */
  SuperAdmin = 'SuperAdmin',
  /** 授权限给 update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** 授权限给 update Asset */
  UpdateAsset = 'UpdateAsset',
  /** 授权限给 update Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** 授权更新 GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** 授权限给 update Product */
  UpdateProduct = 'UpdateProduct',
  /** 授权限给 update System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** 授权限给 update System */
  UpdateSystem = 'UpdateSystem',
  /** 授权限给 update Tag */
  UpdateTag = 'UpdateTag'
}

/** 手机号冲突错误 */
export type PhoneConflictError = ErrorResult & {
  __typename?: 'PhoneConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** 文章发布状态 */
export enum PostState {
  /** 存档 */
  ARCHIVED = 'ARCHIVED',
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 发布 */
  PUBLISH = 'PUBLISH'
}

/** 作品 */
export type Product = Node & {
  __typename?: 'Product';
  /** 作品相关资产 */
  assets?: Maybe<Array<Maybe<Asset>>>;
  /** 作品内容 */
  content: Scalars['JSON'];
  createdAt: Scalars['DateTime'];
  /** 创造者 */
  creator?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** 作品是否启用 */
  enabled?: Maybe<Scalars['Boolean']>;
  /** 作品特色图片 */
  featured?: Maybe<Asset>;
  id: Scalars['ID'];
  /** 作品配置选项 */
  option?: Maybe<ProductOption>;
  /** 作品公开内容、内容描述等 */
  publicly?: Maybe<Scalars['JSON']>;
  /** 作品标识 */
  slug: Scalars['String'];
  /** 作品发布状态 */
  state?: Maybe<ProductState>;
  /** 作品标题 */
  title?: Maybe<Scalars['String']>;
  /** 作品类型 */
  type: ProductType;
  updatedAt: Scalars['DateTime'];
};

/** 产品类别 */
export enum ProductCategory {
  /** 资料 */
  DATA = 'DATA',
  /** 绘画 */
  DRAWING = 'DRAWING',
  /** 游戏 */
  GAME = 'GAME',
  /** 生活 */
  LIFE = 'LIFE',
  /** 受限制 */
  LIMITED = 'LIMITED',
  /** 素材 */
  MATERIAL = 'MATERIAL',
  /** 其它 */
  OTHER = 'OTHER',
  /** 播客 */
  PODCAST = 'PODCAST',
  /** 私密 */
  PRIVATE = 'PRIVATE',
  /** 学习 */
  STUDY = 'STUDY',
  /** 科技 */
  TECHNOLOGY = 'TECHNOLOGY',
  /** 手账 LIFE BOOK */
  TECHO = 'TECHO',
  /** 未分类 */
  UNCATEGORIZED = 'UNCATEGORIZED',
  /** 视频 */
  VIDEO = 'VIDEO',
  /** 写作 */
  WRITING = 'WRITING'
}

/** 作品列表 */
export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

/** 作品配置 */
export type ProductOption = {
  __typename?: 'ProductOption';
  /** 作品差异化定价 */
  diffPrice?: Maybe<Array<Maybe<DiffPriceOption>>>;
  /** 作品定价 */
  price?: Maybe<Scalars['Float']>;
  /** 作品的保护机制配置 */
  protect?: Maybe<ProtectOption>;
  /** 开启订阅制的配置 */
  subscription?: Maybe<ProductSubscriptionPeriod>;
};

/** 作品状态 */
export enum ProductState {
  /** 存档 */
  ARCHIVED = 'ARCHIVED',
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 发布 */
  PUBLISH = 'PUBLISH'
}

/** 产品订阅周期 */
export enum ProductSubscriptionPeriod {
  /** 月订阅 */
  MONTH = 'MONTH',
  /** 年订阅 */
  YEAR = 'YEAR'
}

/** 作品商品类型 */
export enum ProductType {
  /**
   * 有声读物
   * 让客户听你的音频内容。
   */
  AUDIOBOOK = 'AUDIOBOOK',
  /**
   * 课程或教程
   * 卖一节课或教一群学生
   */
  COURSE_TUTORIAL = 'COURSE_TUTORIAL',
  /**
   * 数字产品
   * 任何要下载或流媒体的文件集。
   */
  DIGITAL = 'DIGITAL',
  /** 提供PDF、ePub和Mobi格式的书籍或漫画。 */
  EBOOK = 'EBOOK',
  /**
   * 会员
   * 围绕你的粉丝开展会员业务
   */
  MEMBERSHIP = 'MEMBERSHIP',
  /** 通过电子邮件发布的内容。 */
  NEWSLETTER = 'NEWSLETTER',
  /**
   * 实物产品
   * 出售任何需要运输的东西。
   */
  PHYSICAL_GOOD = 'PHYSICAL_GOOD',
  /**
   * 播客
   * 播客的内容可以使用流媒体直接下载。
   */
  PODCAST = 'PODCAST'
}

/** 作品的保护机制配置 */
export type ProtectOption = {
  __typename?: 'ProtectOption';
  /** 保护方法 */
  method?: Maybe<Scalars['String']>;
  /** 保护类型 */
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>;
};

export type Role = Node & {
  __typename?: 'Role';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  permissions: Array<Permission>;
  updatedAt: Scalars['DateTime'];
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type SearchInput = {
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};

export type SearchResultSortParameter = {
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
};

/** 服务类型 */
export enum ServiceType {
  /** 标准服务 */
  NORMAL = 'NORMAL',
  /** 增值服务 */
  VAS = 'VAS'
}

/** 用户 Session 类型 */
export enum SessionType {
  /** 匿名 */
  ANONYMOUS = 'ANONYMOUS',
  /** 授权的 */
  AUTHENTICATED = 'AUTHENTICATED'
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type StringOperators = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  notContains?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
};

/** 操作成功的指示，这里我们不返回任何具体信息 */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int'];
};

export enum TaxonomyEnum {
  /** 分类 */
  CATEGORY = 'CATEGORY',
  /** 链接分类 */
  LINK_CATEGORY = 'LINK_CATEGORY',
  /** 内容标签 */
  POST_TAG = 'POST_TAG'
}

/** 分类法 */
export type Term = Node & {
  __typename?: 'Term';
  /** 类别下内容数量统计 */
  count?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 特色图 */
  featured?: Maybe<Asset>;
  id: Scalars['ID'];
  /** 分类名 */
  name: Scalars['String'];
  /** 父类别 */
  pid?: Maybe<Scalars['ID']>;
  /** 类别标识 */
  slug: Scalars['String'];
  /** 分类模式 */
  taxonomy: TaxonomyEnum;
  updatedAt: Scalars['DateTime'];
};

export type TermList = PaginatedList & {
  __typename?: 'TermList';
  items: Array<Term>;
  totalItems: Scalars['Int'];
};

/** 更新管理员密码结果 */
export type UpdateAdministratorPasswordResult = InvalidCredentialsError | NativeAuthStrategyError | Success;

export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  featured?: Maybe<Asset>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};
