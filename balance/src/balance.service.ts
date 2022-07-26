import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) { }

  public async refillBalance(
    userId,
    totalBalance,
    transactionInfo,
  ): Promise<any> {
    return this.balanceModel.updateOne(
      { userId: userId },
      {
        $set: { total: totalBalance },
        $push: { transactions: transactionInfo },
      },
    );
  }

  public async getBalance(userId): Promise<IBalance> {
    return this.balanceModel.findOne({ userId: userId }).exec();
  }
}
