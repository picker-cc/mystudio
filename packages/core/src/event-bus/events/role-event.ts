import { CreateRoleInput, UpdateRoleInput } from '@picker-cc/common/lib/generated-types';
import { ID } from '@picker-cc/common/lib/shared-types';

import { RequestContext } from '../../api/common/request-context';
import { Role } from '../../entity/role/role.entity';
import {PickerEntityEvent} from "../picker-entity-event";

type RoleInputTypes = CreateRoleInput | UpdateRoleInput | ID;

/**
 * @description
 * 每当添加、更新或删除一个 {@link Role} 时都会触发此事件。
 * @docsCategory events
 * @docsPage Event Types
 */
export class RoleEvent extends PickerEntityEvent<Role, RoleInputTypes> {
    constructor(
        ctx: RequestContext,
        entity: Role,
        type: 'created' | 'updated' | 'deleted',
        input?: RoleInputTypes,
    ) {
        super(entity, type, ctx, input);
    }
}
