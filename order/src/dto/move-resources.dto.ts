import { OrderType } from './order-request.dto';

export class MoveResourcesDto {
  dealId: string;
  orderForBuy: {
    isFrozen: boolean;
    orderId: string;
    userId: string;
    productId: string;
    quantity: number;
    cost: number;
    orderType: OrderType;
    isFullSize: boolean;
    _id: string;
  };
  orderForSell: {
    isFrozen: boolean;
    orderId: string;
    userId: string;
    productId: string;
    quantity: number;
    cost: number;
    orderType: OrderType;
    isFullSize: boolean;
    _id: string;
  };
}
