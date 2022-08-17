import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderStatusDto,
  OrderStatusEnum,
} from './dto/create-order-status.dto';
import {
  OrderStatus,
  OrderStatusDocument,
} from './schemas/order-status.schema';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderStatus.name)
    private orderStatusModel: Model<OrderStatusDocument>,
  ) {}

  public createOrder(createOrderRequest: CreateOrderStatusDto) {
    return this.orderModel.create(createOrderRequest);
  }

  public createOrderStatus(createOrderStatus: CreateOrderStatusDto) {
    return this.orderStatusModel.create({
      status: OrderStatusEnum.PROCESSING,
      createdAt: new Date(),
      message: '',
      ...createOrderStatus,
    });
  }

  // public changeOrderStatus(createOrderRequest: OrderRequestDto) {
  //   return this.orderModel.create(createOrderRequest);
  // }
}
