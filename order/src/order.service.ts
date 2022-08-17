import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRequestDto } from './dto/order-request.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  public async createOrder(createOrderRequest: OrderRequestDto) {
    const order = await this.orderModel.create(createOrderRequest);
    return await order.save();
  }
}
