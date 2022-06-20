import { RequestContext } from '../../../api/common/request-context';
import { Transitions } from '../../../common/finite-state-machine/types';
import { Order } from '../../../entity/order/order.entity';

/**
 * @description
 * 这些是Order流程的默认状态。它们可以通过使用{@link OrderOptions} `process` 属性来扩充和修改。
 * @docsCategory orders
 */
export type OrderState =
    | 'Created'
    | 'AddingItems'
    | 'ArrangingPayment'
    | 'PaymentAuthorized'
    | 'PaymentSettled'
    | 'PartiallyShipped'
    | 'Shipped'
    | 'PartiallyDelivered'
    | 'Delivered'
    | 'Modifying'
    | 'ArrangingAdditionalPayment'
    | 'Cancelled';

export const orderStateTransitions: Transitions<OrderState> = {
    Created: {
        to: ['AddingItems'],
    },
    AddingItems: {
        to: ['ArrangingPayment', 'Cancelled'],
    },
    ArrangingPayment: {
        to: ['PaymentAuthorized', 'PaymentSettled', 'AddingItems', 'Cancelled'],
    },
    PaymentAuthorized: {
        to: ['PaymentSettled', 'Cancelled', 'Modifying', 'ArrangingAdditionalPayment'],
    },
    PaymentSettled: {
        to: [
            'PartiallyDelivered',
            'Delivered',
            'PartiallyShipped',
            'Shipped',
            'Cancelled',
            'Modifying',
            'ArrangingAdditionalPayment',
        ],
    },
    PartiallyShipped: {
        to: ['Shipped', 'PartiallyDelivered', 'Cancelled', 'Modifying'],
    },
    Shipped: {
        to: ['PartiallyDelivered', 'Delivered', 'Cancelled', 'Modifying'],
    },
    PartiallyDelivered: {
        to: ['Delivered', 'Cancelled', 'Modifying'],
    },
    Delivered: {
        to: ['Cancelled'],
    },
    Modifying: {
        to: [
            'PaymentAuthorized',
            'PaymentSettled',
            'PartiallyShipped',
            'Shipped',
            'PartiallyDelivered',
            'ArrangingAdditionalPayment',
        ],
    },
    ArrangingAdditionalPayment: {
        to: [
            'PaymentAuthorized',
            'PaymentSettled',
            'PartiallyShipped',
            'Shipped',
            'PartiallyDelivered',
            'Cancelled',
        ],
    },
    Cancelled: {
        to: [],
    },
};

export interface OrderTransitionData {
    ctx: RequestContext;
    order: Order;
}
