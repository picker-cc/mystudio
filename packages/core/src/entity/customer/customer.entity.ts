import {Order} from '../order/order.entity';
import {User} from '../user/user.entity';
import {SoftDeletable} from "../../common";
import {PickerMongoEntity} from "../base/mongo-base.entity";
import {Address} from "cluster";
import {CustomerGroup} from "../customer-group/customer-group.entity";
import {Channel} from "diagnostics_channel";
import {DeepPartial} from "@picker-cc/common/lib/shared-types";
import {Entity, ManyToMany, OneToMany, OneToOne, Property} from '@mikro-orm/core';

/**
 * @description
 * 这个实体代表商店的一个客户，通常是一个个人。Customer可以是guest，在这种情况下，
 * 它没有关联的{@link User}。拥有注册帐户的客户将拥有一个关联的User实体。
 *
 * @docsCategory entities
 */
@Entity()
export class Customer extends PickerMongoEntity implements SoftDeletable {
    constructor(input?: DeepPartial<Customer>) {
        super(input);
    }

    @Property({type: Date, nullable: true})
    deletedAt: Date | null;

    @Property({nullable: true})
    title: string;

    @Property() name: string;

    @Property({nullable: true})
    phoneNumber: string;

    @Property()
    emailAddress: string;

    @ManyToMany(() => CustomerGroup, group => group.customers)
    groups: CustomerGroup[];

    // @OneToMany(type => Address, address => address.customer)
    // addresses: Address[];

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @OneToOne(() => User)
    user?: User;
}
