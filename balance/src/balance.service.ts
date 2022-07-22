import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) { }

  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

  public async refillBalance({
    balanceId,
    transactionId,
    refillSum,
  }): Promise<ICurrentBalance> {
    const exception = new RpcException({
      message: 'Balance not found',
      code: status.NOT_FOUND,
    });

    // TODO кажется криво проверять id по длине для соответствия Id
    // хотелось бы делать это в proto файле
    if (balanceId.length !== 24) throw exception;
    const balance = await this.balanceModel.findById(balanceId);
    if (!balance) {
      throw exception;
    }

    if (balance.transactions.find((t) => t === transactionId)) {
      return balance;
    }
    balance.transactions.push(String(transactionId));
    balance.total = Number(balance.total) + Number(refillSum);

    // TODO красиво избавиться от дублирования поиска транзакции
    return this.balanceModel.findByIdAndUpdate(balanceId, balance, {
      new: true,
    });
  }
}
