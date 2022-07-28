import { Body, Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
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
  async refillBalance(@Body() refillBalanceDto: RefillBalanceDto) {
    try {
      const refillStatusObservable =
        this.grpcService.refillBalance(refillBalanceDto);
      return await lastValueFrom(refillStatusObservable);
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(@Body() getBalanceDto: GetBalanceDto) {
    try {
      const balanceObservable = this.grpcService.getBalance(getBalanceDto);
      const balance = await lastValueFrom(balanceObservable);
      return { total: balance.total };
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
