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

  @GrpcMethod('BalanceController', 'RefillBalance')
  refillBalance(
    refillBalanceInfo: IRefillBalanceInfo,
    metadata: any,
  ): ICurrentBalance {
    return { total: this.balanceService.refillBalance(refillBalanceInfo) };
  }
}
