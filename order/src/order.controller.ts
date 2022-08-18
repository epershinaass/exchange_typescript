import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
} from '@nestjs/microservices';
import {
  KAFKA_CONFIG_BALANCE,
  KAFKA_CONFIG_PRODUCTS,
} from './config/kafka.config';
import { BalanceFrozenDto } from './dto/order-frozen.dto';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Client(KAFKA_CONFIG_BALANCE)
  private clientBalance: ClientKafka;

  @Client(KAFKA_CONFIG_PRODUCTS)
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
      if (orderRequestDto.orderType === OrderType.BUY) {
        this.clientBalance.emit('order_created', {
          orderStatusId: orderStatusId,
          order: orderRequestDto,
        });
      } else {
        this.clientProducts.emit('order_created', {
          orderStatusId: orderStatusId,
          order: orderRequestDto,
        });
      }
      // else freezeProducts()
    }
    return { status: 0 };
  }

  @EventPattern('resources_frozen')
  handleBalanceFrozen(balanceFrozenDto: BalanceFrozenDto) {
    if (balanceFrozenDto.isFrozen === true) {
      this.orderService.createOrder(balanceFrozenDto.order);
    }
    this.orderService.changeOrderStatus(balanceFrozenDto);
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
