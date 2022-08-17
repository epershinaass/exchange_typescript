import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
  RpcException,
} from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { KAFKA_CONFIG } from './config/kafka.config';
import { GetBalanceDto } from './dto/get-balance.dto';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { getGrpcError } from './errors/balance.error';

const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Controller()
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  @EventPattern('order_created')
  async handleOrderCreated(orderRequestDto: OrderRequestDto) {
    if (orderRequestDto.orderType === OrderType.BUY) {
      const sumForFreeze =
        (orderRequestDto.cost as any).low *
        (orderRequestDto.quantity as any).low;
      const isFrozen: boolean = await this.balanceService.freezeSum(
        orderRequestDto.userId,
        sumForFreeze,
      );

      this.client.emit('resources_frozen', {
        isFrozen: isFrozen,
        order: orderRequestDto,
      });
      // .subscribe(() => {
      //   console.log('balance frozen with: ' + JSON.stringify(data));
      // });
    }
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
