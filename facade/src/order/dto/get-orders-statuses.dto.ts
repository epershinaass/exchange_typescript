export enum OrderType {
  BUY = 0,
  SELL = 1,
}

export class GetOrdersStatusesResponseDto {
  orders: OrderStatus[];
}

export class OrderStatus {
  id: string;
  status: string;
  createdAt: string;
  message: string;
  orderId: string;
  userId: string;
  productId: string;
  quantity: number;
  cost: number;
  orderType: OrderType;
  isFullSize: boolean;
}

export class GetOrdersStatusesRequestDto {
  userId: string;
}
