import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  GrpcMethod,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { Observer } from 'rxjs';

@Controller()
export class OrderController implements OnModuleInit {
  private orders;
  constructor(/*private readonly orderService: OrderService*/) {
    this.orders = [];
  }

  @MessagePattern('orders')
  getoOrder(@Payload() order): string {
    console.log('Recieved from kafka: ', JSON.stringify(order));
    return this.orders.push(order);
  }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'orders',
        allowAutoTopicCreation: true,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('orders'); // topic
    await this.client.connect();
    console.log('Init OK');
  }

  @GrpcMethod('OrderController', 'CreateOrder')
  async createOrder(order) {
    console.log(`order: ${JSON.stringify(order)} is recieved`);
    const sentToKafkaObserver: Observer<any> = {
      next: () => {},
      error: (err) => {
        if (err) console.error(err);
      },
      complete: () => {
        console.log('Send messaage to kafka complete');
      },
    };
    this.client.send('orders', order).subscribe(sentToKafkaObserver);
    return { status: 0 };
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    return { orders: this.orders };
  }
}
