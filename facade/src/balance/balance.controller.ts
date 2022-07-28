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
      return await this.grpcService.refillBalance(refillBalanceDto).toPromise();
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(@Body() getBalanceDto: GetBalanceDto) {
    try {
      return await this.grpcService.getBalance(getBalanceDto).toPromise();
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
