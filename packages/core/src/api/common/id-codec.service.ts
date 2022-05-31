import { Injectable } from '@nestjs/common';

import { IdCodec } from './id-codec';
import {ConfigService} from "../../config";

@Injectable()
export class IdCodecService {
    private idCodec: IdCodec;
    constructor(configService: ConfigService) {
        this.idCodec = new IdCodec(configService.entityIdStrategy);
    }

    encode<T extends string | number | boolean | object | undefined>(target: T, transformKeys?: string[]): T {
        return this.idCodec.encode(target, transformKeys);
    }

    decode<T extends string | number | object | undefined>(target: T, transformKeys?: string[]): T {
        return this.idCodec.decode(target, transformKeys);
    }
}
