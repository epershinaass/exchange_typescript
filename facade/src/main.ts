import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllRpcExceptionFilter } from './filter/grpc-exception-filter';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:3000',
    package: 'facade',
    protoPath: join(__dirname, '/proto/facade.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.useGlobalFilters(new AllRpcExceptionFilter());
  app.listen();
}
bootstrap();
