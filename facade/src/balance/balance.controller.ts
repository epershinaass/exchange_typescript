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

  @GrpcMethod('BalanceController', 'RefillBalance')
  refillBalance(@Body() refillBalanceDto: RefillBalanceDto) {
    return this.grpcService.refillBalance(refillBalanceDto);
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  getBalance(@Body() getBalanceDto: GetBalanceDto) {
    return this.grpcService.getBalance(getBalanceDto);
  }
}
