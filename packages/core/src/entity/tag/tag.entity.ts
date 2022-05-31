import {PickerMongoEntity} from "../base/mongo-base.entity";
import {Entity, Index, ManyToOne, Property} from '@mikro-orm/core';
import {DeepPartial} from "@picker-cc/common/lib/shared-types";

/**
 * @description
 * A tag is an arbitrary label which can be applied to certain entities.
 * It is used to help organize and filter those entities.
 *
 * @docsCategory entities
 */
@Entity()
export class Tag extends PickerMongoEntity {
    constructor(input?: DeepPartial<Tag>) {
        super(input);
    }

    @Property()
    value: string;
}
