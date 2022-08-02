import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:3001',
    package: 'facade',
    protoPath: join(__dirname, '/proto/facade.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
