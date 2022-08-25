import { OrderType } from './order-request.dto';

export class BalanceFrozenDto {
  isFrozen: boolean;
  orderStatusId: string;
  message: string;
  order: {
    orderId: string;
    userId: string;
    productId: string;
    quantity: number;
    cost: number;
    orderType: OrderType;
    isFullSize: boolean;
  };
}
