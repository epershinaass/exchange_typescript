import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { getStatusGrpcError, statusGrpc } from './errors/balance.error';

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
      return getStatusGrpcError(statusGrpc.INVALID_ARGUMENT);
    }
    const balance = await this.balanceService.getBalance(
      refillBalanceDto.balanceId,
    );
    if (!balance) {
      return getStatusGrpcError(statusGrpc.NOT_FOUND);
    }

    if (
      balance.transactions.find(
        (t) => t.transactionId === refillBalanceDto.transactionId,
      )
    ) {
      return { total: balance.total };
    }

    balance.transactions.push({
      transactionId: refillBalanceDto.transactionId,
      currentBalance: balance.total,
      refillSum: refillBalanceDto.refillSum,
      transactionTime: new Date(),
    });
    balance.total = Number(balance.total) + Number(refillBalanceDto.refillSum);

    const newBalance = await this.balanceService.refillBalance(
      refillBalanceDto.balanceId,
      balance,
    );
    return { total: newBalance.total };
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(getBalanceDto: GetBalanceDto, metadata: any) {
    if (!checkForObjectId.test(getBalanceDto.balanceId)) {
      return getStatusGrpcError(statusGrpc.INVALID_ARGUMENT);
    }
    const currentBalance = await this.balanceService.getBalance(
      getBalanceDto.balanceId,
    );
    if (!currentBalance) {
      return getStatusGrpcError(statusGrpc.NOT_FOUND);
    }
    return { total: currentBalance.total };
  }
}
