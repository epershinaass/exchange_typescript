import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'; // <-- Add this
import { ProductsModule } from './products.module';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'products',
    protoPath: join(__dirname, '../src/products.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ProductsModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();