import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  Transport,
  ClientOptions,
} from '@nestjs/microservices';
import { IGrpcService } from './interfaces/grpc.interface';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'balance',
    protoPath: join(__dirname, './proto/balance.proto'),
  },
};

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService =
      this.client.getService<IGrpcService>('BalanceController');
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    return this.grpcService.accumulate({ data });
  }
}
