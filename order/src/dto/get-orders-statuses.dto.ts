import { OrderType } from './order-request.dto';

export class GetOrdersStatusesResponseDto {
  orders: OrderStatus[];
}

export class OrderStatus {
  id: string;
  status: string;
  created_at: string;
  message: string;
  order_id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  cost: number;
  order_type: OrderType;
  is_full_size: boolean;
}

export class GetOrdersStatusesRequestDto {
  userId: string;
}
