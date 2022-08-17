import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
} from '@nestjs/microservices';
import { KAFKA_CONFIG } from './config/kafka.config';
import { BalanceFrozenDto } from './dto/order-frozen.dto';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';

@Controller()
export class OrderController {
  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  @GrpcMethod('OrderController', 'CreateOrder')
  createOrder(createOrderRequest: OrderRequestDto) {
    // TODO: сохранили в бд со статусом processing
    if (createOrderRequest.orderType === OrderType.BUY) {
      this.client.emit('order_created', createOrderRequest);
    }
    // else freezeProducts()
    return { status: 0 };
  }

  @EventPattern('balance_frozen')
  handleBalanceFrozen(balanceFrozenDto: BalanceFrozenDto) {
    if (balanceFrozenDto.isFrozen === true) {
      console.log('save into MarketDepth');
      console.log('Change status to DONE');
    } else {
      console.log('Change status to CANCELED');
    }
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
