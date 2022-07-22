import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { IGrpcService } from './interfaces/grpc.interface';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'balance',
    protoPath: join(__dirname, './proto/balance.proto'),
  },
};

@Controller()
export class BalanceController implements OnModuleInit {
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

  /* запрос через grpc делаем такого вида
  http://localhost:3000/      RefillBalance
  {
    "balanceId": "62d9abf5c79d1502fdf98d97",
    "transactionId": "1233213",
    "refillSum": 100
  }
  */
  @GrpcMethod('BalanceController', 'RefillBalance')
  async refillBalance(@Body() refillBalanceDto: RefillBalanceDto) {
    return this.grpcService.refillBalance(refillBalanceDto);
  }
}
