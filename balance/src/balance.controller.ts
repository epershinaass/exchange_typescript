import { Controller } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class BalanceController {
  constructor(private balanceService: BalanceService) { }

  @GrpcMethod('BalanceController', 'Accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    return { sum: this.balanceService.accumulate(numberArray.data) };
  }

  /* запрос через grpc делаем такого вида
  http://localhost:5000/      RefillBalance

  {
    "balanceId": "62d9abf5c79d1502fdf98d97",
    "transactionId": "1233213",
    "refillSum": 100
  }
  */
  @GrpcMethod('BalanceController', 'RefillBalance')
  async refillBalance(refillBalanceInfo: IRefillBalanceInfo, metadata: any) {
    return await this.balanceService.refillBalance(refillBalanceInfo);
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(balanceId: IBalanceId, metadata: any) {
    return await this.balanceService.getBalance(balanceId);
  }
}
