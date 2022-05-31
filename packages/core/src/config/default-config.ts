import {
    DEFAULT_AUTH_TOKEN_HEADER_KEY,
    SUPER_ADMIN_USER_IDENTIFIER,
    SUPER_ADMIN_USER_PASSWORD
} from '@picker-cc/common/lib/shared-constants';
import { Logger } from './logger/picker-logger';
import { RuntimePickerConfig } from './picker-config';
import {InMemorySessionCacheStrategy} from "./session-cache/in-memory-session-cache-strategy";
import {NativeAuthenticationStrategy} from "./auth/native-authentication-strategy";
import {BcryptPasswordHashingStrategy} from "./auth/bcrypt-password-hashing-strategy";
import {ObjectIdStrategy} from "./entity-id-strategy/object-id-strategy";
import {DefaultAssetNamingStrategy} from "./asset-naming-strategy/default-asset-naming-strategy";
import {NoAssetStorageStrategy} from "./asset-storage-strategy/no-asset-storage-strategy";
import {NoAssetPreviewStrategy} from "./asset-preview-strategy/no-asset-preview-strategy";
import {LanguageCode} from "@picker-cc/common/lib/generated-types";
import {DefaultLogger} from "./logger/default-logger";
import { DefaultPasswordValidationStrategy } from './auth/default-password-validation-strategy';

const logger = new Logger();

export const defaultConfig: RuntimePickerConfig = {
    // defaultLanguageCode: LanguageCode.zh,
    logger: new DefaultLogger(),
    apiOptions: {
        hostname: '',
        port: 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: true,
        adminApiDebug: true,
        adminApiValidationRules: [],
        adminListQueryLimit: 100,
        studioApiPath: 'studio-api',
        studioApiDebug: false,
        studioListQueryLimit: 100,
        studioApiPlayground: false,
        studioApiValidationRules: [],
        cors: {
            origin: true,
            credentials: true
        },
        middleware: [],
        apolloServerPlugins: [],
        introspection: true
    },

    authOptions: {
        disableAuth: false,
        tokenMethod: 'cookie',
        cookieOptions: {
            secret: Math.random().toString(36).substr(3),
            httpOnly: true,
        },
        authTokenHeaderKey: DEFAULT_AUTH_TOKEN_HEADER_KEY,
        sessionDuration: '1y',
        sessionCacheStrategy: new InMemorySessionCacheStrategy(),
        requireVerification: false,
        sessionCacheTTL: 300,
        verificationTokenDuration: '7d',
        superadminCredentials: {
            identifier: SUPER_ADMIN_USER_IDENTIFIER,
            password: SUPER_ADMIN_USER_PASSWORD,
        },
        adminAuthenticationStrategy: [ new NativeAuthenticationStrategy() ],
        customPermissions: [],
        passwordHashingStrategy: new BcryptPasswordHashingStrategy(),
        passwordValidationStrategy: new DefaultPasswordValidationStrategy({ minLength: 4 }),
        studioAuthenticationStrategy: [new NativeAuthenticationStrategy()]
    },
    entityIdStrategy: new ObjectIdStrategy(),
    assetOptions: {
        assetNamingStrategy: new DefaultAssetNamingStrategy(),
        assetStorageStrategy: new NoAssetStorageStrategy(),
        assetPreviewStrategy: new NoAssetPreviewStrategy(),
        permittedFileTypes: ['image/*', 'video/*', 'audio/*', '.pdf'],
        uploadMaxFileSize: 20971520,
    },
    dbConnectionOptions: {
        timezone: 'Z',
        type: 'mongo',
    },
    customFields: {
        Address: [],
        Administrator: [],
        Asset: [],
        Customer: [],
        GlobalSettings: [],
        User: [],
    },
    // entityOptions: undefined,
    // jobQueueOptions: {
    //     jobQueueStrategy: new InMemoryJobQueueStrategy(),
    //     jobBufferStorageStrategy: new InMemoryJobBufferStorageStrategy(),
    //     activeQueues: [],
        // enableWorkerHealthCheck: false,
    // },
    jobQueueOptions: undefined,
    plugins: [],
};
