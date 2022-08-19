import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderStatusDto,
  OrderStatusEnum,
} from './dto/create-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { BalanceFrozenDto } from './dto/order-frozen.dto';
import { OrderRequestDto } from './dto/order-request.dto';
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

  public async isIdempotentOrder(orderRequestDto: OrderRequestDto) {
    const doc = await this.orderStatusModel.findOne({
      userId: orderRequestDto.userId,
      orderId: orderRequestDto.orderId,
    });
    return doc ? false : true;
  }

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

  public async changeOrderStatus(balanceFrozenDto: BalanceFrozenDto) {
    const newStatus = balanceFrozenDto.isFrozen
      ? OrderStatusEnum.DONE
      : OrderStatusEnum.CANCELED;
    await this.orderStatusModel.findByIdAndUpdate(
      balanceFrozenDto.orderStatusId,
      {
        status: newStatus,
        message: balanceFrozenDto.message,
      },
    );
  }
}
