import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) { }

  public async refillBalance(balanceId, newBalance): Promise<IBalance> {
    return await this.balanceModel.findByIdAndUpdate(balanceId, newBalance, {
      new: true,
    });
  }

  public async getBalance(balanceId): Promise<IBalance> {
    return await this.balanceModel.findById(balanceId);
  }
}
