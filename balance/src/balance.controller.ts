import { status } from '@grpc/grpc-js';
import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  GrpcMethod,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { getGrpcError } from './errors/balance.error';

const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Controller()
export class BalanceController implements OnModuleInit {
  constructor(private balanceService: BalanceService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka1:9092'], // localhost:29092
      },
      consumer: {
        groupId: 'order-balance',
        allowAutoTopicCreation: true,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('order'); // topic
    await this.client.connect();
    console.log('Init OK');
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
