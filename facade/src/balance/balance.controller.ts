import { Body, Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { GetBalanceDto } from './dto/get-balance.dto';
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
    return await this.grpcService.refillBalance(refillBalanceDto);
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(@Body() getBalanceDto: GetBalanceDto) {
    return await this.grpcService.getBalance(getBalanceDto);
  }
}
