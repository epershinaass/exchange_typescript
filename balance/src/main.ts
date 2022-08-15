import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { BalanceModule } from './balance.module';
import { KAFKA_CONFIG } from './config/kafka.config';

const GRPC_TRANSPORT_OPTIONS: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
    package: 'balance',
    protoPath: join(__dirname, 'proto/balance.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.create(BalanceModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_CONFIG);
  app.connectMicroservice<MicroserviceOptions>(GRPC_TRANSPORT_OPTIONS);

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();

// const microserviceOptions = {
//   transport: Transport.GRPC,
//   options: {
//     url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
//     package: 'balance',
//     protoPath: join(__dirname, 'proto/balance.proto'),
//   },
// };

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(
//     BalanceModule,
//     microserviceOptions,
//   );
//   app.listen();
// }
// bootstrap();
