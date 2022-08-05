import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BalanceModule } from './balance.module';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`,
    package: 'balance',
    protoPath: join(__dirname, 'proto/balance.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    BalanceModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
