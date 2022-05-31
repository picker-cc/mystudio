import {Entity, Property } from "@mikro-orm/core";
import { Permission } from "@picker-cc/common/lib/generated-types";
import { DeepPartial } from "@picker-cc/common/lib/shared-types";
import {SoftDeletable} from "../../common";
import {PickerMongoEntity} from "../base/mongo-base.entity";

/**
 * @description
 * 角色表示权限的集合，这些权限决定了{@link User} 的授权级别
 *
 * @docsCategory entities
 */
@Entity()
export class Role extends PickerMongoEntity {
    constructor(input?: DeepPartial<Role>) {
        super(input);
    }

    @Property()
    code: string;

    @Property()
    description: string;

    @Property()
    permissions: Permission[]
}
