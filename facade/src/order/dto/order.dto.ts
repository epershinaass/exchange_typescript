import { IOrderRequest, IOrderResponse, OrderStatus, OrderType } from "../interfaces/grpc.interface";


export class OrderRequestDto implements IOrderRequest {
  orderId: string;
  userId: string;
  productId: string;
  quantity: any;
  cost: any;
  orderType: OrderType;
  isFullSize: boolean;
}

export class OrderResponseDto implements IOrderResponse {
  status: OrderStatus;
}
