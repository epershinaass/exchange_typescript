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

  @GrpcMethod('BalanceController', 'RefillBalance')
  async refillBalance(refillBalanceDto: RefillBalanceDto, metadata: any) {
    if (!checkForObjectId.test(refillBalanceDto.userId)) {
      return getGrpcError(status.INVALID_ARGUMENT);
    }
    const balance = await this.balanceService.getBalance(
      refillBalanceDto.userId,
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

    if (await this.balanceService.refillBalance(refillBalanceDto)) {
      return getGrpcError(status.OK);
    } else {
      return getGrpcError(status.INTERNAL);
    }
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(getBalanceDto: GetBalanceDto, metadata: any) {
    if (!checkForObjectId.test(getBalanceDto.userId)) {
      return getGrpcError(status.INVALID_ARGUMENT);
    }
    const currentBalance = await this.balanceService.getBalance(
      getBalanceDto.userId,
    );
    if (!currentBalance) {
      return getGrpcError(status.NOT_FOUND);
    }
    return { total: currentBalance.total };
  }
}
