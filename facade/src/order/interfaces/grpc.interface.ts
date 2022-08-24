import { Observable } from 'rxjs';

export interface IOrderService {
  createOrder(order: IOrderRequest): Observable<IOrderResponse>;
  getOrdersStatuses(
    getOrdersStatusesRequest: IGetOrdersStatusesRequest,
  ): Observable<IGetOrdersStatusesResponse>;
  getDoneDeals(
    GetDoneDealsRequest: IGetDoneDealsRequest,
  ): Observable<IGetDoneDealsResponse>;
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

export interface IGetDoneDealsRequest {
  userId: string;
}
export interface IDoneDeal {
  date: string;
  sellerUserId: string;
  buyerUserId: string;
  productId: string;
  quantity: number;
  cost: number;
}

export interface IGetDoneDealsResponse {
  deals: IDoneDeal[];
}

export interface IGetOrdersStatusesRequest {
  userId: string;
}
export interface IOrderStatus {
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

export interface IGetOrdersStatusesResponse {
  orders: IOrderStatus[];
}
