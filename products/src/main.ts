import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'; // <-- Add this
import { ProductsModule } from './products.module';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5001',
    package: 'products',
    protoPath: join(__dirname, 'proto/products.proto'),
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
