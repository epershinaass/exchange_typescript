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
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Client(KAFKA_CONFIG)
  private clientProducts: ClientKafka;

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
      this.clientProducts.emit('order_created', {
        orderStatusId: orderStatusId,
        order: orderRequestDto,
      });
    }
    return { status: 0 };
  }

  @EventPattern('resources_frozen')
  async handleBalanceFrozen(balanceFrozenDto: BalanceFrozenDto) {
    if (balanceFrozenDto.isFrozen === true) {
      this.orderService.createOrder(balanceFrozenDto.order);
      this.orderService.findOrdersForDeal(balanceFrozenDto.order);
    }
    this.orderService.changeOrderStatus(balanceFrozenDto);
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
