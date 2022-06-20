import { CreateAdministratorInput, UpdateAdministratorInput } from '@picker-cc/common/lib/generated-types';
import { ID } from '@picker-cc/common/lib/shared-types';
import { RequestContext } from '../../api';
import { Administrator } from '../../entity';
import { PickerEntityEvent } from '../picker-entity-event';

type AdministratorInputTypes = CreateAdministratorInput | UpdateAdministratorInput | ID;

/**
 * @description
 * 每当添加、更新或删除{@link Administrator}时，都会触发此事件
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class AdministratorEvent extends PickerEntityEvent<Administrator, AdministratorInputTypes> {
    constructor(
        ctx: RequestContext,
        entity: Administrator,
        type: 'created' | 'updated' | 'deleted',
        input?: AdministratorInputTypes,
    ) {
        super(entity, type, ctx, input);
    }
}
