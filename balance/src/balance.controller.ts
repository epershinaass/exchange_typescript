import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import {
  GrpcMethod,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { getGrpcError } from './errors/balance.error';

const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Controller()
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @MessagePattern('freeze.balance')
  freezeBalance(@Payload() order: any) {
    console.log('balance is frozen, or not...: ' + JSON.stringify(order));
    return 'balance is frozen!!!';
  }

  @GrpcMethod('BalanceController', 'RefillBalance')
  async refillBalance(refillBalanceDto: RefillBalanceDto, metadata: any) {
    if (!checkForObjectId.test(refillBalanceDto.userId)) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    try {
      const balance = await this.balanceService.getBalance(
        refillBalanceDto.userId,
      );
      if (
        balance.transactions.find(
          (t) => t.transactionId === refillBalanceDto.transactionId,
        )
      ) {
        return { status: status.OK };
      }
    } catch (e) {
      throw new RpcException(getGrpcError(e));
    }

    await this.balanceService.refillBalance(refillBalanceDto);
    return { status: status.OK };
  }

  @GrpcMethod('BalanceController', 'GetBalance')
  async getBalance(getBalanceDto: GetBalanceDto, metadata: any) {
    if (!checkForObjectId.test(getBalanceDto.userId)) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    try {
      const currentBalance = await this.balanceService.getBalance(
        getBalanceDto.userId,
      );
      return { total: currentBalance.total };
    } catch (e) {
      throw new RpcException(getGrpcError(e));
    }
  }
}
