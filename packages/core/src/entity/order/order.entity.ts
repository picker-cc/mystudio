
import {Entity, ManyToMany, ManyToOne, OneToMany, Property} from "@mikro-orm/core";
import {CustomFieldsObject, HasCustomFields} from "@picker-cc/common/lib/shared-types";
import {PickerMongoEntity} from "../base/mongo-base.entity";
import {SoftDeletable} from "../../common";
import {DeepPartial} from "@picker-cc/common/lib/shared-types";
import { OrderState } from "../../service/helpers/order-state-machine/order-state";
import {Customer} from "../user";
/**
 * @description
 *
 * 每当{@link Customer}向购物车添加商品时，就会创建一个Order。
 * 它包含完成一个订单所需的所有信息:{@link ProductVariant}的数量;送货地址及价格;任何适用的促销活动;支付等。
 *
 * Order根据{@link OrderState}类型以良好定义的状态存在。状态机用于管理从一种状态到另一种状态的转换。
 *
 * @docsCategory entities
 */
@Entity()
export class Order extends PickerMongoEntity {
    constructor(input?: DeepPartial<Order>) {
        super(input);
    }

    /**
     * @description
     * 订单的唯一编码，根据 {@link OrderCodeStrategy}，
     * 这应该用作customer的订单引用，而不是order的id。
     */
    @Property() code: string;

    @Property() state: OrderState;

    /**
     * @description
     * 是否认为 Order 是 "active"，这意味着 Customer 仍然可以对其对行更改，并且还没有完成签出过程。
     * 这是由{@link OrderPlaceStrategy} 管理的
     */
    @Property({ default: true })
    active: boolean;

    /**
     * @description
     * 下单的日期和时间，即客户完成结账，订单不再 "active"，这是由 {@link OrderPlacedStrategy} 管理的
     */
    @Property({ nullable: true })
    orderPlacedAt?: Date;

    @ManyToOne(type => Customer)
    customer?: Customer;

    // @Property(type => OrderLine, line => line.order)
    // lines: OrderLine[];
    //
    /**
     * @description
     * An array of all coupon codes applied to the Order.
     */
    @Property()
    couponCodes: string[];
    // @Property(type => CustomPromotionFields)
    // customFields: CustomFieldsObject;
}
