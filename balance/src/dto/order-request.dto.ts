export enum OrderType {
  BUY = 0,
  SELL = 1,
}

export class OrderRequestDto {
  orderId: string;
  userId: string;
  productId: string;
  quantity: number;
  cost: number;
  orderType: OrderType;
  isFullSize: boolean;
}
