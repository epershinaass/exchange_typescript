import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderStatusDto,
  OrderStatusEnum,
} from './dto/create-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { BalanceFrozenDto } from './dto/order-frozen.dto';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';
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

  public async startDeal(orderForBuy: any, orderForSell: any) {
    // TODO:
    console.log('start deal');
  }

  public async findOrdersForDeal(newOrder: OrderRequestDto) {
    let ordersForDeal = [];
    if (newOrder.orderType === OrderType.BUY) {
      // сделка на покупку разом
      if (newOrder.isFullSize) {
        ordersForDeal = await this.orderModel.find({
          orderType: OrderType.SELL,
          productId: newOrder.productId,
          cost: { $lte: newOrder.cost },
          quantity: { $gte: newOrder.quantity },
          userId: { $ne: newOrder.userId },
        });
        ordersForDeal.sort((a, b) => a.cost - b.cost);
        console.log('orders for deal: ' + ordersForDeal);
        for (const orderForSell of ordersForDeal) {
          console.log('order for sell: ' + orderForSell);
          console.log('order for buy: ' + JSON.stringify(newOrder));
          if (
            (orderForSell.isFullSize &&
              Number(newOrder.quantity) === orderForSell.quantity) ||
            (!orderForSell.isFullSize &&
              orderForSell.quantity >= Number(newOrder.quantity))
          ) {
            this.startDeal(newOrder, orderForSell);
            break;
          }
        }
      } else {
        // TODO not full size deal for buy
      }
    } else if (newOrder.orderType === OrderType.SELL) {
      if (newOrder.isFullSize) {
        ordersForDeal = await this.orderModel.find({
          orderType: OrderType.BUY,
          productId: newOrder.productId,
          cost: { $gte: newOrder.cost },
          quantity: { $gte: newOrder.quantity },
          userId: { $ne: newOrder.userId },
        });
        ordersForDeal.sort((a, b) => a.cost - b.cost);
        for (const orderForBuy of ordersForDeal) {
          if (
            (orderForBuy.isFullSize &&
              Number(newOrder.quantity) === orderForBuy.quantity) ||
            (!orderForBuy.isFullSize &&
              orderForBuy.quantity >= newOrder.quantity)
          ) {
            this.startDeal(orderForBuy, newOrder);
            break;
          }
        }
      } else {
        // TODO not full size deal for sell
      }
    }
  }
}
