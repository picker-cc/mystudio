import {Entity, Property, Unique} from '@mikro-orm/core';
import {PickerMongoEntity} from "../base/mongo-base.entity";
import {SoftDeletable} from "../../common";
import {DeepPartial} from "@picker-cc/common/lib/shared-types";

@Entity()
export class Option extends PickerMongoEntity implements SoftDeletable {
    constructor(input: DeepPartial<Option>) {
        super(input);
    }

    @Property()
    @Unique({options: {partialFilterExpression: {key: {$exists: true}}}})
    key: string;

    @Property()
    value?: any;

    @Property()
    description: string;

    @Property({default: false})
    shared: boolean;

    @Property()
    deletedAt: Date | null;
}
