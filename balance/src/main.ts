import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  KafkaOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { BalanceModule } from './balance.module';

const GRPC_TRANSPORT_OPTIONS: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
    // url: `localhost:5003`,
    package: 'balance',
    protoPath: join(__dirname, 'proto/balance.proto'),
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
  const app = await NestFactory.create(BalanceModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_TRANSPORT_OPTIONS);
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
