import {OrderModel} from '../models/order-model';

export interface Order {
    placeOrder(model: OrderModel);
    cancelOrder(model: OrderModel);
}
