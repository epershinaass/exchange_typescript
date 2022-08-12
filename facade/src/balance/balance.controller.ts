import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GetBalanceDto } from './dto/get-balance.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { IBalanceService } from './interfaces/grpc.interface';
import { CLIENT_OPTS } from './constants';


@Controller()
export class BalanceController implements OnModuleInit {
  constructor(
    @Inject(CLIENT_OPTS) private client: ClientGrpc,
  ) {}

  private balanceService: IBalanceService;

  onModuleInit() {
    this.balanceService =
      this.client.getService<IBalanceService>('BalanceController');
  }

  @GrpcMethod('BalanceController', 'RefillBalance')
  async refillBalance(@Body() refillBalanceDto: RefillBalanceDto) {
      const refillStatusObservable =
        this.balanceService.refillBalance(refillBalanceDto);
      return await lastValueFrom(refillStatusObservable);
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(@Body() getBalanceDto: GetBalanceDto) {
      const balanceObservable = this.balanceService.getBalance(getBalanceDto);
      const balance = await lastValueFrom(balanceObservable);
      return { total: balance.total };
  }
}
