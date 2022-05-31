/**
 * Expansion cloud storage service.
 * @file 扩展模块 cloud storage 服务
 * @module module/expansion/cs.service
 */

import { Injectable } from '@nestjs/common';
// @ts-ignore
import OSS from 'ali-oss';
// import * as APP_CONFIG from '@app/app.config';
// import { Injectable } from '@nestjs/common';

const STS = (OSS as any).STS;

export interface IUpToken {
    AccessKeyId: string;
    AccessKeySecret: string;
    SecurityToken: string;
    Expiration: string;
}

@Injectable()
export class CloudStorageService {
    private sts: typeof STS;

    constructor() {
        this.sts = new STS({
            accessKeyId: 'LTAI4FfvLFwH5ybz57U8yZEa',
            accessKeySecret: 'YscSIAYpSYru8XMUQA0b70eMI2fEAm',
        });
    }

    // 获取临时 Token
    public async getToken(): Promise<IUpToken> {
        // acs:ram::123456789012****:role/adminrole
        const response = await this.sts.assumeRole(
            // APP_CONFIG.CLOUD_STORAGE.aliyunAcsARN,
            // $accountID：云账号ID。您可以通过登录阿里云控制台，将鼠标悬停在右上角头像的位置，单击安全设置进行查看。
            // $roleName：RAM角色名称。您可以通过登录RAM控制台，单击左侧导航栏的RAM角色管理，在RAM角色名称列表下进行查看。
            'acs:ram::1950211040722694:role/caixiepickerossrole',
            null,
            15 * 60,
            'session-name',
        );
        return response.credentials;
    }

    // 上传文件
    public async uploadFile(
        name: string,
        file: any,
        region: string,
        bucket: string,
    ): Promise<{ name: string; data: object }> {
        return this.getToken().then(token => {
            let client: OSS = new OSS({
                region,
                bucket,
                accessKeyId: token.AccessKeyId,
                accessKeySecret: token.AccessKeySecret,
                stsToken: token.SecurityToken,
                secure: true,
            });
            return client.put(name, file).finally(() => {
                // @ts-ignore
                client = null;
            });
        });
    }
}
