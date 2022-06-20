import {Injectable} from '@nestjs/common';

// import { TransactionalConnection } from '../connection/transactional-connection';
import {Administrator} from '../entity/administrator/administrator.entity';

import {AdministratorService} from './services/administrator.service';
import {RoleService} from './services/role.service';
import {EntityManager} from "@mikro-orm/mongodb";
import {Logger} from "../config";
import {MikroORM, UseRequestContext} from "@mikro-orm/core";

/**
 * 仅用于在内部以正确的顺序在引导过程中运行各种服务初始化方法。
 */
@Injectable()
export class InitializerService {
    constructor(
        // private em: EntityManager,
        private orm: MikroORM,
        // private connection: TransactionalConnection,
        //     private zoneService: ZoneService,
        //     private channelService: ChannelService,
        private roleService: RoleService,
        private administratorService: AdministratorService,
        // private shippingMethodService: ShippingMethodService,
        // private globalSettingsService: GlobalSettingsService,
    ) {
    }

    // @UseRequestContext()
    async onModuleInit() {
        // async init() {
        //     await this.awaitDbSchemaGeneration();
        // IMPORTANT - why manually invoke these init methods rather than just relying on
        // Nest's "onModuleInit" lifecycle hook within each individual service class?
        // The reason is that the order of invocation matters. By explicitly invoking the
        // methods below, we can e.g. guarantee that the default channel exists
        // (channelService.initChannels()) before we try to create any roles (which assume that
        // there is a default Channel to work with.
        // await this.zoneService.initZones();
        // await this.globalSettingsService.initGlobalSettings();
        // await this.channelService.initChannels();
        // const result = await this.orm.em.getRepository(Administrator).find({})
        // if (!result) {
        await this.roleService.initRoles();
        await this.administratorService.initAdministrators();
        // }
        // await this.shippingMethodService.initShippingMethods()
        // console.log('初始化 init...service ...')
    }

    private async awaitDbSchemaGeneration() {
        const retries = 20;
        const delayMs = 100;
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                // const result = await this.connection.getRepository(Administrator).find();
                // const result = await this.em.find(Administrator, {});
                const result = await this.orm.em.getRepository(Administrator).find({})
                return;
            } catch (e: any) {
                if (attempt < retries - 1) {
                    Logger.warn(`Awaiting DB schema creation... (attempt ${attempt})`);
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                } else {
                    Logger.error(`Timed out when awaiting the DB schema to be ready!`, undefined, e.stack);
                }
            }
        }
    }
}
