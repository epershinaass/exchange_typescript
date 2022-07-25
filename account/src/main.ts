import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'; // <-- Add this
import { AccountModule } from './account-module';


const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, './msg/account-grpc.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AccountModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
