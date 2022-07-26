import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { getGrpcError } from './errors/balance.error';

const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Controller()
export class BalanceController {
  constructor(private balanceService: BalanceService) { }

  /* запрос через grpc делаем такого вида
  http://localhost:5000/      RefillBalance

  {
    "balanceId": "62d9abf5c79d1502fdf98d97",
    "transactionId": "1233213",
    "refillSum": 100
  }
  */
  @GrpcMethod('BalanceController', 'RefillBalance')
  async refillBalance(refillBalanceDto: RefillBalanceDto, metadata: any) {
    if (!checkForObjectId.test(refillBalanceDto.balanceId)) {
      return getGrpcError(status.INVALID_ARGUMENT);
    }
    const balance = await this.balanceService.getBalance(
      refillBalanceDto.balanceId,
    );
    if (!balance) {
      return getGrpcError(status.NOT_FOUND);
    }

    if (
      balance.transactions.find(
        (t) => t.transactionId === refillBalanceDto.transactionId,
      )
    ) {
      return getGrpcError(status.OK);
    }

    const totalBalance =
      Number(balance.total) + Number(refillBalanceDto.refillSum);
    const transactionInfo = {
      transactionId: refillBalanceDto.transactionId,
      currentBalance: balance.total,
      refillSum: refillBalanceDto.refillSum,
      transactionTime: new Date(),
    };

    if (
      await this.balanceService.refillBalance(
        refillBalanceDto.balanceId,
        totalBalance,
        transactionInfo,
      )
    ) {
      return getGrpcError(status.OK);
    } else {
      return getGrpcError(status.INTERNAL);
    }
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(getBalanceDto: GetBalanceDto, metadata: any) {
    if (!checkForObjectId.test(getBalanceDto.balanceId)) {
      return getGrpcError(status.INVALID_ARGUMENT);
    }
    const currentBalance = await this.balanceService.getBalance(
      getBalanceDto.balanceId,
    );
    if (!currentBalance) {
      return getGrpcError(status.NOT_FOUND);
    }
    return { total: currentBalance.total };
  }
}
