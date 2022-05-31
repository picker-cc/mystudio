import {DeepPartial, HasCustomFields} from '@picker-cc/common/lib/shared-types';
import {Embedded, Entity, Index, OneToMany, Property, Unique} from '@mikro-orm/core';

import {InternalServerError, SoftDeletable} from '../../common';
import { Asset } from '../asset/asset.entity';
import { PickerMongoEntity } from '../base/mongo-base.entity';

// import {AuthenticationMethod} from "../authentication-method/authentication-method.entity";
import { CustomUserFields } from '../custom-entity-fields';
import {UserRole} from "./user.embedded";
import {NativeAuthenticationMethod, ExternalAuthenticationMethod, AuthenticationMethod} from "../authentication-method";

/**
 * @description
 * 用户代表 Picker API 的任何经过身份验证的用户。这包括两种用户
 * {@link Administrator}s 以及注册的 {@link Customer}s
 */
@Entity({
    tableName: 'users'
})
export class User extends PickerMongoEntity implements HasCustomFields, SoftDeletable {
    constructor(input?: DeepPartial<User>) {
        super(input);
    }
    @Property({ type: Date, nullable: true })
    deletedAt: Date | null;

    /**
     * 识别码
     */
    @Property()
    @Unique({ options: { partialFilterExpression: { identifier: { $exists: true } } } })
    identifier!: string;

    /**
     * 要对外展示的名字
     * 微信用户使用 wechat nickName
     * 其他用户使用同步自 basicInfo 或自定义的名字，昵称或真实姓名
     */
    @Property({nullable: true})
    displayName?: string;

    /**
     * 用户特色图片，可能是头像、或其他
     * 微信用户使用 wechat avatarUrl
     * 其他用户如果自定义头像则使用此 field
     */
    @Property({nullable: true})
    featured?: Asset;

    @Embedded(() => [NativeAuthenticationMethod, ExternalAuthenticationMethod], {array: true})
    authenticationMethods?: AuthenticationMethod[]

    /** 是否验证或绑定 */
    @Property({ default: false })
    verified?: boolean;

    @Embedded(() => UserRole, { array: true })
    roles: UserRole[];

    // 是否启用
    @Property({ default: true })
    enabled?: boolean;

    // 最后登录时间
    @Property({ type: Date, nullable: true })
    lastLogin?: Date | null;


    @Property({type: CustomUserFields})
    customFields: CustomUserFields

    getNativeAuthenticationMethod(): NativeAuthenticationMethod {
        if (!this.authenticationMethods) {
            throw new InternalServerError('error.user-authentication-methods-not-loaded');
        }
        const match = this.authenticationMethods.find(
            (m): m is NativeAuthenticationMethod => m instanceof NativeAuthenticationMethod,
        );
        if (!match) {
            throw new InternalServerError('error.native-authentication-methods-not-found');
        }
        return match;
    }
}
