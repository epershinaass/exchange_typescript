import { Controller } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  data: number[];
}

interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class BalanceController {
  constructor(private balanceService: BalanceService) { }

  @GrpcMethod('BalanceController', 'Accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    return { sum: this.balanceService.accumulate(numberArray.data) };
  }
}
