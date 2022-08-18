import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderStatusDto,
  OrderStatusEnum,
} from './dto/create-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
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

  public createOrder(createOrderRequest: CreateOrderDto) {
    return this.orderModel.create(createOrderRequest);
  }

  public async createOrderStatus(createOrderStatus: CreateOrderStatusDto) {
    const doc = await this.orderStatusModel.create({
      status: OrderStatusEnum.PROCESSING,
      createdAt: new Date(),
      message: '',
      ...createOrderStatus,
    });
    return doc.id;
  }

  public async changeOrderStatus(orderStatusId, newStatus) {
    await this.orderStatusModel.findByIdAndUpdate(orderStatusId, {
      status: newStatus,
    });
  }
}
