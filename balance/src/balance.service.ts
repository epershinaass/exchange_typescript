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

  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

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

    if (balance.transactions.find((t) => t === transactionId)) {
      return { total: balance.total };
    }
    balance.transactions.push(String(transactionId));
    balance.total = Number(balance.total) + Number(refillSum);

    // TODO красиво избавиться от дублирования поиска транзакции
    const newBalance = await this.balanceModel.findByIdAndUpdate(
      balanceId,
      balance,
      { new: true },
    );
    return { total: newBalance.total };
  }
}
