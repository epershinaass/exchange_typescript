import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'; // <-- Add this
import { AppModule } from './account-module';
import mongoose from 'mongoose';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../src/account-grpc.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  await mongoose.connect('mongodb://localhost:27017/account');
  await app.listen();
}
bootstrap();
