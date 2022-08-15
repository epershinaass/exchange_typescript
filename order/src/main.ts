import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  KafkaOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { OrderModule } from './order.module';

const GRPC_TRANSPORT_OPTIONS: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    // url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
    url: `0.0.0.0:5003`,
    package: 'order',
    protoPath: join(__dirname, 'proto/order.proto'),
  },
};

export const KAFKA_TRANSPORT_OPTIONS: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['kafka1:9092'], // localhost:29092
    },
    consumer: {
      groupId: 'order-balance',
      allowAutoTopicCreation: true,
    },
    subscribe: {
      fromBeginning: true,
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_TRANSPORT_OPTIONS);
  app.connectMicroservice<MicroserviceOptions>(GRPC_TRANSPORT_OPTIONS);

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
