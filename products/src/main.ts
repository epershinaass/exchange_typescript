import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { ProductsModule } from './products.module';
import { KAFKA_CONFIG } from './config/kafka.config';

const GRPC_TRANSPORT_OPTIONS: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
    package: 'products',
    protoPath: join(__dirname, 'proto/products.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_CONFIG);
  app.connectMicroservice<MicroserviceOptions>(GRPC_TRANSPORT_OPTIONS);

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
