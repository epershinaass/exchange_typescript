import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import {
  KAFKA_CONFIG_BALANCE,
  KAFKA_CONFIG_PRODUCTS,
} from './config/kafka.config';
import { OrderModule } from './order.module';

const GRPC_TRANSPORT_OPTIONS: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
    package: 'order',
    protoPath: join(__dirname, 'proto/order.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_CONFIG_BALANCE);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_CONFIG_PRODUCTS);
  app.connectMicroservice<MicroserviceOptions>(GRPC_TRANSPORT_OPTIONS);

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
