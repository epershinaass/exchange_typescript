import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getStatusGrpcError, statusGrpc } from './errors/balance.error';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) { }

  public async refillBalance({
    balanceId,
    transactionId,
    refillSum,
  }): Promise<ICurrentBalance | IError> {
    const err = getStatusGrpcError(statusGrpc.NOT_FOUND);

    // TODO кажется криво проверять id по длине для соответствия Id
    // хотелось бы делать это в proto файле
    if (balanceId.length !== 24) {
      return err;
    }
    const balance = await this.balanceModel.findById(balanceId);
    if (!balance) {
      return err;
    }

    if (balance.transactions.find((t) => t.transactionId === transactionId)) {
      return { total: balance.total };
    }
    balance.transactions.push({
      transactionId: transactionId,
      currentBalance: balance.total,
      refillSum: refillSum,
      transactionTime: new Date(),
    });
    balance.total = Number(balance.total) + Number(refillSum);

    // TODO красиво избавиться от дублирования поиска транзакции
    const newBalance = await this.balanceModel.findByIdAndUpdate(
      balanceId,
      balance,
      { new: true },
    );
    return { total: newBalance.total };
  }

  // TODO вынести проверку id в отдельный метод
  // TODO вынести отдельно exception
  public async getBalance({ balanceId }): Promise<ICurrentBalance | IError> {
    const err = getStatusGrpcError(statusGrpc.NOT_FOUND);

    if (balanceId.length !== 24) {
      return err;
    }
    const balance = await this.balanceModel.findById(balanceId);
    if (!balance) {
      return err;
    }
    return { total: balance.total };
  }
}
