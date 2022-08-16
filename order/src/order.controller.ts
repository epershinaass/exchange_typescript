import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
} from '@nestjs/microservices';
import { KAFKA_CONFIG } from './config/kafka.config';

@Controller()
export class OrderController {
  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  @GrpcMethod('OrderController', 'CreateOrder')
  createOrder(createOrderRequest) {
    this.client.emit('order_created', createOrderRequest);
    return { status: 0 };
  }

  @EventPattern('balance_frozen')
  handleBalanceFrozen(data: any) {
    console.log(data);
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
