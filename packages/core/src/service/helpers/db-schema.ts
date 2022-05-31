import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

// import { ListQueryBuilder } from '../helpers/list-query-builder/list-query-builder';
// import {CreatePostInput, RegisterCreatorInput} from '@picker-cc/common/lib/generated-types';
// import {ID, PaginatedList} from '@picker-cc/common/lib/shared-types';
// import {EntityManager, MikroORM} from 'mikro-orm';

// import {InjectRepository} from 'nestjs-mikro-orm';
// import {RequestContext} from '../../api/common/request-context';
// import {ConfigService} from '../../config/config.service';
// import {Post} from '../../entity';
// import {User} from '../../entity/users/user.entity';
// import {EventBus} from '../../event-bus/event-bus';
// import {PasswordCipher} from '../helpers/PasswordCipher';
// import {VerificationTokenGenerator} from '../helpers/verification-token-generator';

@Injectable()
export class DbSchema {
    constructor(private readonly em: EntityManager, private readonly orm: MikroORM) {}

    // const generator = this.em.getSchemaGenerator();
    //
    // const dropDump = await generator.getDropSchemaSQL();
    //
    // const createDump = await generator.getCreateSchemaSQL();
    //
    // const updateDump = await generator.getUpdateSchemaSQL();
    //
    // there is also `generate()` method that returns drop + create queries
    // const dropAndCreateDump = await generator.generate();
    //
    // or you can run those queries directly, but be sure to check them first!
    // await generator.dropSchema();
    // await generator.createSchema();
    // await generator.updateSchema();
    //
    // await orm.close(true);
    //
    // dropSchema() {
    // }
    async createSchema() {
        await this.orm.getSchemaGenerator().dropSchema(true);
        await this.orm.getSchemaGenerator().createSchema(true);
        const sql = await this.orm.getMetadata().getAll();
        // await this.orm.close();
    }

    // updateSchema()  {
    //
    // }
}
