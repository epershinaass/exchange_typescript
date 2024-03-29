import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KAFKA_CONFIG } from './config/kafka.config';
import {
  CreateOrderStatusDto,
  OrderStatusEnum,
} from './dto/create-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetDoneDealsRequestDto } from './dto/get-done-deal.dto';
import { GetOrdersStatusesRequestDto } from './dto/get-orders-statuses.dto';
import { BalanceFrozenDto } from './dto/order-frozen.dto';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';
import { BalanceMovedDto, ProductsMovedDto } from './dto/resources-moved.dto';
import { Deal, DealDocument } from './schemas/deal.schema';
import { DoneDeal, DoneDealDocument } from './schemas/done-deal.schema';
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
    @InjectModel(Deal.name) private dealModel: Model<DealDocument>,
    @InjectModel(DoneDeal.name) private doneDealModel: Model<DoneDealDocument>,
  ) {}

  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

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

  public async getDoneDeals(getDoneDealsRequest: GetDoneDealsRequestDto) {
    const deals = await this.doneDealModel.find({
      $or: [
        {
          sellerUserId: getDoneDealsRequest.userId,
        },
        {
          buyerUserId: getDoneDealsRequest.userId,
        },
      ],
    });
    return { deals };
  }

  public async getOrdersStatuses(
    getOrdersStatusesRequest: GetOrdersStatusesRequestDto,
  ) {
    const orders = await this.orderStatusModel.find({
      userId: getOrdersStatusesRequest.userId,
    });
    return { orders };
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

  public async freezeOrder(freezeOrderDto) {
    console.log(freezeOrderDto);
    this.orderModel
      .findByIdAndUpdate(freezeOrderDto.id, { isFrozen: true }, { new: true })
      .exec();
  }

  public async startDeal(orderForBuy: any, orderForSell: any) {
    // TODO:
    this.freezeOrder(orderForSell);
    this.freezeOrder(orderForBuy);
    console.log('create deal');
    const deal = await this.dealModel.create({
      startTime: new Date(),
      balanceTaken: false,
      productTaken: false,
      productGiven: false,
      balanceGiven: false,
      sellOrder: orderForSell.id,
      buyOrder: orderForBuy.id,
    });
    this.client.emit('move_recources', {
      dealId: deal.id,
      orderForBuy,
      orderForSell,
    });
  }

  public async changeBalanceDealStatus(balanceMoved: BalanceMovedDto) {
    const deal = await this.dealModel.findByIdAndUpdate(
      balanceMoved.dealId,
      {
        balanceGiven: balanceMoved.balanceGiven,
        balanceTaken: balanceMoved.balanceTaken,
      },
      {
        new: true,
      },
    );
    this.checkDealIsDone(deal);
  }

  public async changeProductsDealStatus(productsMoved: ProductsMovedDto) {
    const deal = await this.dealModel.findByIdAndUpdate(
      productsMoved.dealId,
      {
        productGiven: productsMoved.productGiven,
        productTaken: productsMoved.productTaken,
      },
      {
        new: true,
      },
    );
    this.checkDealIsDone(deal);
  }

  public async checkDealIsDone(deal) {
    if (
      deal.balanceTaken &&
      deal.balanceGiven &&
      deal.productGiven &&
      deal.productTaken
    ) {
      this.finishDeal(deal);
    }
  }

  public async finishDeal(deal) {
    const seller = await this.orderModel.findById(deal.sellOrder);
    const buyer = await this.orderModel.findById(deal.buyOrder);

    const cost = seller.cost;
    const quantity =
      buyer.quantity >= seller.quantity ? seller.quantity : buyer.quantity;
    const productId = seller.productId;

    this.doneDealModel.create({
      date: new Date(),
      sellerUserId: seller.userId,
      buyerUserId: buyer.userId,
      productId,
      quantity,
      cost,
    });

    await this.orderModel.findByIdAndDelete(deal.sellOrder);
    await this.orderModel.findByIdAndDelete(deal.buyOrder);
    await this.dealModel.findByIdAndDelete(deal.id);
  }

  public async findOrdersForDeal(newOrder) {
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
          isFrozen: false,
        });
        ordersForDeal.sort((a, b) => a.cost - b.cost);
        // console.log('orders for deal: ' + ordersForDeal);
        for (const orderForSell of ordersForDeal) {
          // console.log('order for sell: ' + orderForSell);
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
          isFrozen: false,
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
