import { OrderType } from './order-request.dto';

export class CreateOrderDto {
  orderId: string;
  userId: string;
  productId: string;
  quantity: number;
  cost: number;
  orderType: OrderType;
  isFullSize: boolean;
}
