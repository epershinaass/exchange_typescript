import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { HelloController } from './hello.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [HelloController],
})
export class HelloModule { }
