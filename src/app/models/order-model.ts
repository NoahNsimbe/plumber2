import {ClientModel} from './client-model';

export interface OrderModel {
    orderNo: string;
    client: ClientModel;
    description: string;
    orderTime: Date;
    orderStatus: string;
    location: {
        latitude: number,
        longitude: number
    };
}
