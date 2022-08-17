export enum OrderType {
  BUY = 0,
  SELL = 1,
}

export class OrderRequestDto {
  order_id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  cost: number;
  order_type: OrderType;
  is_full_size: boolean;
}
