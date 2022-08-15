import { Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, GrpcMethod } from '@nestjs/microservices';
import { KAFKA_CONFIG } from './config/kafka.config';

@Controller()
export class OrderController implements OnModuleInit {
  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('freeze.balance'); // topic
    await this.client.connect();
    console.log('Init OK');
  }

  @GrpcMethod('OrderController', 'CreateOrder')
  createOrder(order) {
    console.log(order);
    // const sentToKafkaObserver: Observer<any> = {
    //   next: () => {},
    //   error: (err) => {
    //     if (err) console.error(err);
    //   },
    //   complete: () => {
    //     console.log('Send messaage to kafka complete');
    //   },
    // };
    // this.client.send('order', order).subscribe(sentToKafkaObserver);
    console.log(this.client.emit('freeze.balance', order));
    return { status: 0 };
  }

  @GrpcMethod('OrderController', 'GetOrders')
  async getOrders() {
    console.log('getOrders');
  }
}
