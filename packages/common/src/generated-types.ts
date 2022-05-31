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

export type Administrator = Node & {
  __typename?: 'Administrator';
  createdAt: Scalars['DateTime'];
  domain?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type AdministratorFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  domain?: InputMaybe<StringOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type AdministratorList = PaginatedList & {
  __typename?: 'AdministratorList';
  items: Array<Administrator>;
  totalItems: Scalars['Int'];
};

export type AdministratorListOptions = {
  /** 允许过滤结果 */
  filter?: InputMaybe<AdministratorFilterParameter>;
  /** 指定多个 "filter" 参数是否应该与逻辑的 AND 或 OR 操作组合，默认为 AND */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** 跳过前n个结果以用于分页 */
  skip?: InputMaybe<Scalars['Int']>;
  /** 指定根据哪些属性对结果进行排序 */
  sort?: InputMaybe<AdministratorSortParameter>;
  /** 获取n个结果，用于分页 */
  take?: InputMaybe<Scalars['Int']>;
};

export type AdministratorSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  domain?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

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
  tags: Array<Tag>;
  title?: Maybe<Scalars['String']>;
  type: AssetType;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};

export type AssetFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  fileSize?: InputMaybe<NumberOperators>;
  height?: InputMaybe<NumberOperators>;
  mimeType?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  preview?: InputMaybe<StringOperators>;
  source?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  width?: InputMaybe<NumberOperators>;
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export type AssetListOptions = {
  /** 允许过滤结果 */
  filter?: InputMaybe<AssetFilterParameter>;
  /** 指定多个 "filter" 参数是否应该与逻辑的 AND 或 OR 操作组合，默认为 AND */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** 跳过前n个结果以用于分页 */
  skip?: InputMaybe<Scalars['Int']>;
  /** 指定根据哪些属性对结果进行排序 */
  sort?: InputMaybe<AssetSortParameter>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  tagsOperator?: InputMaybe<LogicalOperator>;
  /** 获取n个结果，用于分页 */
  take?: InputMaybe<Scalars['Int']>;
};

export type AssetSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  fileSize?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mimeType?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  preview?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export enum AssetType {
  BINARY = 'BINARY',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export type AssignAssetsToChannelInput = {
  assetIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

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

/**
 * Returned when the default LanguageCode of a Channel is no longer found in the `availableLanguages`
 * of the GlobalSettings
 */
export type ChannelDefaultLanguageError = ErrorResult & {
  __typename?: 'ChannelDefaultLanguageError';
  channelCode: Scalars['String'];
  errorCode: ErrorCode;
  language: Scalars['String'];
  message: Scalars['String'];
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

export type CoordinateInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type CreateAdministratorInput = {
  /** 管理员登录账号 */
  emailAddress: Scalars['String'];
  /** 管理员姓名 */
  name: Scalars['String'];
  /** 管理员密码 */
  password: Scalars['String'];
};

export type CreateAssetInput = {
  file: Scalars['Upload'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateAssetResult = Asset | MimeTypeError;

/** 创建配置的输入项 */
export type CreateOptionInput = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 配置键 */
  key: Scalars['String'];
  /** 是否公开共享 */
  shared: Scalars['Boolean'];
  /** 配置值 */
  value: Scalars['JSON'];
};

/** 创建作品内容 */
export type CreateProductInput = {
  /** 作品相关资产 */
  assetIds?: InputMaybe<Array<Scalars['ID']>>;
  /** 作品内容 */
  content?: InputMaybe<Scalars['JSON']>;
  /** 特色图 */
  featuredId?: InputMaybe<Scalars['ID']>;
  /** 作品公开内容、内容描述等 */
  publicly?: InputMaybe<Scalars['JSON']>;
  /** 作品配置 */
  setting?: InputMaybe<ProductSettingInput>;
  /** 作品发布状态 */
  state?: InputMaybe<ProductState>;
  /** 作品名 */
  title?: InputMaybe<Scalars['String']>;
  /** 作品商品类型 */
  type?: InputMaybe<ProductType>;
};

export type CreateRoleInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
};

export type CreateTermInput = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 特色图 */
  featuredId?: InputMaybe<Scalars['ID']>;
  /** 类别名 */
  name: Scalars['String'];
  /** 父级类别 */
  pid?: InputMaybe<Scalars['ID']>;
  /** slug 标识 */
  slug?: InputMaybe<Scalars['String']>;
  /** 分类法 */
  taxonomy?: InputMaybe<TaxonomyEnum>;
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

export type DeleteAssetInput = {
  assetId: Scalars['ID'];
  deleteFromAllChannels?: InputMaybe<Scalars['Boolean']>;
  force?: InputMaybe<Scalars['Boolean']>;
};

export type DeleteAssetsInput = {
  assetIds: Array<Scalars['ID']>;
  deleteFromAllChannels?: InputMaybe<Scalars['Boolean']>;
  force?: InputMaybe<Scalars['Boolean']>;
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

export type DiffPriceOptionInput = {
  /** 定价的信息描述 */
  info?: InputMaybe<Scalars['String']>;
  /** 售价 */
  price: Scalars['Float'];
  /** 价格的版本名称 */
  versionName: Scalars['String'];
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

export type GlobalSettings = {
  __typename?: 'GlobalSettings';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

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

export type MimeTypeError = ErrorResult & {
  __typename?: 'MimeTypeError';
  errorCode: ErrorCode;
  fileName: Scalars['String'];
  message: Scalars['String'];
  mimeType: Scalars['String'];
};

export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Assign assets to channel */
  assignAssetsToChannel: Array<Asset>;
  /** Assign a Role to an Administrator */
  assignRoleToAdministrator: Administrator;
  /** 创建一个超级管理员 */
  createAdministrator: Administrator;
  /** Create a new Asset */
  createAssets: Array<CreateAssetResult>;
  /** Create a new Option */
  createOption: Option;
  /** 创建一个作品 */
  createProduct?: Maybe<Product>;
  /** 创建一个新角色 */
  createRole: Role;
  /** 创建分类项 */
  createTerm: Term;
  /** Delete an Administrator */
  deleteAdministrator: DeletionResponse;
  /** Delete an Asset */
  deleteAsset: DeletionResponse;
  /** Delete multiple Assets */
  deleteAssets: DeletionResponse;
  /** 删除角色 */
  deleteRole: DeletionResponse;
  /** 删除CSM用户 */
  deleteTerm?: Maybe<DeletionResponse>;
  /** Enabled/Disabled Administrator */
  enabledAdministrator: Success;
  /** Update the active (currently logged-in) Administrator */
  updateActiveAdministrator: Administrator;
  /** Update an existing Administrator */
  updateAdministrator: Administrator;
  /** Update Administrator Password */
  updateAdministratorPassword: UpdateAdministratorPasswordResult;
  /** Update an existing Asset */
  updateAsset: Asset;
  updateGlobalSettings: UpdateGlobalSettingsResult;
  updateOption: Option;
  /** 更新角色 */
  updateRole: Role;
  /** 更新分类项 */
  updateTerm: Term;
};


export type MutationAssignAssetsToChannelArgs = {
  input: AssignAssetsToChannelInput;
};


export type MutationAssignRoleToAdministratorArgs = {
  administratorId: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationCreateAdministratorArgs = {
  input: CreateAdministratorInput;
};


export type MutationCreateAssetsArgs = {
  input: Array<CreateAssetInput>;
};


export type MutationCreateOptionArgs = {
  input: CreateOptionInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateTermArgs = {
  input?: InputMaybe<CreateTermInput>;
};


export type MutationDeleteAdministratorArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteAssetArgs = {
  input: DeleteAssetInput;
};


export type MutationDeleteAssetsArgs = {
  input: DeleteAssetsInput;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTermArgs = {
  id: Scalars['ID'];
};


export type MutationEnabledAdministratorArgs = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type MutationUpdateActiveAdministratorArgs = {
  input: UpdateActiveAdministratorInput;
};


export type MutationUpdateAdministratorArgs = {
  input: UpdateAdministratorInput;
};


export type MutationUpdateAdministratorPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationUpdateAssetArgs = {
  input: UpdateAssetInput;
};


export type MutationUpdateGlobalSettingsArgs = {
  input: UpdateGlobalSettingsInput;
};


export type MutationUpdateOptionArgs = {
  input: UpdateOptionInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateTermArgs = {
  input: UpdateTermInput;
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

export type Node = {
  id: Scalars['ID'];
};

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

/** 系统配置选项 */
export type Option = Node & {
  __typename?: 'Option';
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** 键 */
  key: Scalars['String'];
  /** 是否公开 */
  shared?: Maybe<Scalars['Boolean']>;
  /** 值 */
  value?: Maybe<Scalars['JSON']>;
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

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

export type PermissionDefinition = {
  __typename?: 'PermissionDefinition';
  assignable: Scalars['Boolean'];
  description: Scalars['String'];
  name: Scalars['String'];
};

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

export type ProductFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  deletedAt?: InputMaybe<DateOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  state?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

/** 作品列表 */
export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  /** 允许过滤结果 */
  filter?: InputMaybe<ProductFilterParameter>;
  /** 指定多个 "filter" 参数是否应该与逻辑的 AND 或 OR 操作组合，默认为 AND */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** 跳过前n个结果以用于分页 */
  skip?: InputMaybe<Scalars['Int']>;
  /** 指定根据哪些属性对结果进行排序 */
  sort?: InputMaybe<ProductSortParameter>;
  /** 获取n个结果，用于分页 */
  take?: InputMaybe<Scalars['Int']>;
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

/** 作品的保护机制配置 */
export type ProductSettingInput = {
  /** 作品差异化定价 */
  diffPrice?: InputMaybe<Array<DiffPriceOptionInput>>;
  /** 保护方法 */
  method: Scalars['String'];
  /** 作品定价 */
  price?: InputMaybe<Scalars['Float']>;
  /** 作品的保护机制配置 */
  protect?: InputMaybe<Array<ProductSettingInput>>;
  /** 开启订阅制的配置 */
  subscription?: InputMaybe<ProductSubscriptionPeriod>;
  /** 保护类型 */
  type: Scalars['String'];
};

export type ProductSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  activeAdministrator?: Maybe<Administrator>;
  administrator?: Maybe<Administrator>;
  administrators?: Maybe<AdministratorList>;
  /** Get a single Asset by id */
  asset?: Maybe<Asset>;
  /** Get a list of Assets */
  assets: AssetList;
  globalSettings: GlobalSettings;
  /** 查询全部作品 */
  products?: Maybe<ProductList>;
  role?: Maybe<Role>;
  roles: RoleList;
  /** 查询全部分类方法 */
  terms?: Maybe<TermList>;
};


export type QueryAdministratorArgs = {
  id: Scalars['ID'];
};


export type QueryAdministratorsArgs = {
  options?: InputMaybe<AdministratorListOptions>;
};


export type QueryAssetArgs = {
  id: Scalars['ID'];
};


export type QueryAssetsArgs = {
  options?: InputMaybe<AssetListOptions>;
};


export type QueryProductsArgs = {
  options?: InputMaybe<ProductListOptions>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRolesArgs = {
  options?: InputMaybe<RoleListOptions>;
};


export type QueryTermsArgs = {
  options?: InputMaybe<TermListOptions>;
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

export type RoleFilterParameter = {
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type RoleListOptions = {
  /** 允许过滤结果 */
  filter?: InputMaybe<RoleFilterParameter>;
  /** 指定多个 "filter" 参数是否应该与逻辑的 AND 或 OR 操作组合，默认为 AND */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** 跳过前n个结果以用于分页 */
  skip?: InputMaybe<Scalars['Int']>;
  /** 指定根据哪些属性对结果进行排序 */
  sort?: InputMaybe<RoleSortParameter>;
  /** 获取n个结果，用于分页 */
  take?: InputMaybe<Scalars['Int']>;
};

export type RoleSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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

export type ServerConfig = {
  __typename?: 'ServerConfig';
  permissions: Array<PermissionDefinition>;
  permittedAssetTypes: Array<Scalars['String']>;
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

export type TermFilterParameter = {
  count?: InputMaybe<NumberOperators>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  taxonomy?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type TermList = PaginatedList & {
  __typename?: 'TermList';
  items: Array<Term>;
  totalItems: Scalars['Int'];
};

export type TermListOptions = {
  /** 允许过滤结果 */
  filter?: InputMaybe<TermFilterParameter>;
  /** 指定多个 "filter" 参数是否应该与逻辑的 AND 或 OR 操作组合，默认为 AND */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** 跳过前n个结果以用于分页 */
  skip?: InputMaybe<Scalars['Int']>;
  /** 指定根据哪些属性对结果进行排序 */
  sort?: InputMaybe<TermSortParameter>;
  /** 获取n个结果，用于分页 */
  take?: InputMaybe<Scalars['Int']>;
};

export type TermSortParameter = {
  count?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  pid?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UpdateActiveAdministratorInput = {
  emailAddress?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UpdateAdministratorInput = {
  emailAddress?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roleIds?: InputMaybe<Array<Scalars['ID']>>;
};

/** 更新管理员密码结果 */
export type UpdateAdministratorPasswordResult = InvalidCredentialsError | NativeAuthStrategyError | Success;

export type UpdateAssetInput = {
  focalPoint?: InputMaybe<CoordinateInput>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateGlobalSettingsInput = {
  availableLanguages?: InputMaybe<Array<LanguageCode>>;
  outOfStockThreshold?: InputMaybe<Scalars['Int']>;
  trackInventory?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateGlobalSettingsResult = ChannelDefaultLanguageError | GlobalSettings;

/** 更新配置的输入项 */
export type UpdateOptionInput = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** 键 */
  key: Scalars['String'];
  /** 是否公开共享 */
  shared?: InputMaybe<Scalars['Boolean']>;
  /** 值 */
  value?: InputMaybe<Scalars['JSON']>;
};

export type UpdateRoleInput = {
  code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  permissions?: InputMaybe<Array<Permission>>;
};

export type UpdateTermInput = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 特色图 */
  featuredId?: InputMaybe<Scalars['ID']>;
  /** Term ID */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** 父级类别 */
  pid?: InputMaybe<Scalars['ID']>;
  /** slug 标识 */
  slug?: InputMaybe<Scalars['String']>;
  /** 分类法 */
  taxonomy?: InputMaybe<TaxonomyEnum>;
};

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

export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};
