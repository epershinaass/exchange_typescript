import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AccountModule } from './account.module';


const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.ACC_URL}:${process.env.ACC_PORT}`,
    package: 'account',
    protoPath: join(__dirname, 'proto/account.proto'),
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
