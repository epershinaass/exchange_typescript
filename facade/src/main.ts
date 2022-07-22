import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3000',
    package: 'balance',
    protoPath: join(__dirname, 'balance/proto/balance.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen(); // default url: 'localhost:5000'
}
bootstrap();
