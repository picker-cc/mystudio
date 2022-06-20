import { Customer } from '../customer/customer.entity';
import {DeepPartial, Entity, ManyToMany, Property} from "@mikro-orm/core";
import {PickerMongoEntity} from "../base/mongo-base.entity";

/**
 * @description
 * 一组{@link Customer}，支持基于组的促销或税收规则等功能。
 *
 * @docsCategory entities
 */
@Entity()
export class CustomerGroup extends PickerMongoEntity {
    constructor(input?: DeepPartial<CustomerGroup>) {
        super(input);
    }

    @Property() name: string;

    @ManyToMany(() => Customer)
    customers: Customer[];
}
