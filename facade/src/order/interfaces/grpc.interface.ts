import { Observable } from 'rxjs';

export interface IOrderService {
  createOrder(order: IOrderRequest): Observable<IOrderResponse>;
  getOrders(): void;
}

export enum OrderType {
  BUY = 0,
  SELL = 1,
}

export interface IOrderRequest {
  orderId: string;
  userId: string;
  productId: string;
  quantity: any;
  cost: any;
  orderType: OrderType;
  isFullSize: boolean;
}

export enum OrderStatus {
  PROCESSING = 0,
  DONE = 1,
  CANCELED = 2,
}

export interface IOrderResponse {
  status: OrderStatus;
}
