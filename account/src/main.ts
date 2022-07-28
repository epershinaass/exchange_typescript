import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AccountModule } from './account-module';


const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.SERVICE_URL??'0.0.0.0'}:${process.env.SERVICE_PORT??'5002'}`,
    package: 'account',
    protoPath: join(__dirname, 'msg/account-grpc.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AccountModule,
    microserviceOptions,
  );
  await app.listen();
  console.log('Account service is started');
}
bootstrap();
