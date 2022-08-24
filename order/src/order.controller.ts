import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
} from '@nestjs/microservices';
import { KAFKA_CONFIG } from './config/kafka.config';
import { BalanceFrozenDto } from './dto/order-frozen.dto';
import { OrderRequestDto } from './dto/order-request.dto';
import { BalanceMovedDto, ProductsMovedDto } from './dto/resources-moved.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  @GrpcMethod('OrderController', 'CreateOrder')
  async createOrder(orderRequestDto: OrderRequestDto) {
    const isIdempotent = await this.orderService.isIdempotentOrder(
      orderRequestDto,
    );
    if (isIdempotent) {
      const orderStatusId = await this.orderService.createOrderStatus(
        orderRequestDto,
      );

      orderRequestDto.quantity = orderRequestDto.quantity.toString();
      orderRequestDto.cost = orderRequestDto.cost.toString();
      this.client.emit('order_created', {
        orderStatusId: orderStatusId,
        order: orderRequestDto,
      });
    }
    return { status: 0 };
  }

  @EventPattern('resources_frozen')
  async handleBalanceFrozen(balanceFrozenDto: BalanceFrozenDto) {
    if (balanceFrozenDto.isFrozen === true) {
      const order = await this.orderService.createOrder(balanceFrozenDto.order);
      await this.orderService.findOrdersForDeal(order);
    }
    this.orderService.changeOrderStatus(balanceFrozenDto);
  }

  @EventPattern('balance_moved')
  async handleBalanceMoved(balanceMoved: BalanceMovedDto) {
    this.orderService.changeBalanceDealStatus(balanceMoved);
  }

  @EventPattern('products_moved')
  async handleProductsMoved(produtsMoved: ProductsMovedDto) {
    this.orderService.changeProductsDealStatus(produtsMoved);
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
