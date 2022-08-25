import { OrderType } from './order-request.dto';

export enum OrderStatusEnum {
  PROCESSING = 0,
  DONE = 1,
  CANCELED = 2,
}

export class CreateOrderStatusDto {
  orderId: string;
  userId: string;
  productId: string;
  quantity: number;
  cost: number;
  orderType: OrderType;
  isFullSize: boolean;
}
