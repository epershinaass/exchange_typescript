import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
} from '@nestjs/microservices';
import { KAFKA_CONFIG } from './config/kafka.config';
import { OrderRequestDto } from './dto/order-request.dto';

@Controller()
export class OrderController {
  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  @GrpcMethod('OrderController', 'CreateOrder')
  createOrder(createOrderRequest: OrderRequestDto) {
    // TODO: сохранили в бд со статусом processing
    this.client.emit('order_created', createOrderRequest);
    return { status: 0 };
  }

  @EventPattern('balance_frozen')
  handleBalanceFrozen(data: any) {
    // проверяем заморозился ли баланс
    // если нет, то ставим статус заявки canceled
    // если да, то меняем статус заявки на done и сохраняем в стакан
    console.log(data);
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
