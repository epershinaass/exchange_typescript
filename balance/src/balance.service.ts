import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) { }

  public async refillBalance(
    refillBalanceDto: RefillBalanceDto,
  ): Promise<IBalance> {
    // операция атомарна, перезаписи документа не будет
    // Надо ли добавлять автоинкрементирующийся счетчик для проверки выполнения
    // если операция точно выполнится и докумнет ничто не перезапишет?
    return this.balanceModel
      .findOneAndUpdate(
        { userId: refillBalanceDto.userId },
        {
          $inc: { total: refillBalanceDto.refillSum },
          $push: {
            transactions: {
              transactionId: refillBalanceDto.transactionId,
              refillSum: refillBalanceDto.refillSum,
              transactionTime: new Date(),
            },
          },
        },
      )
      .exec();
  }

  public async getBalance(userId): Promise<IBalance> {
    return this.balanceModel.findOne({ userId: userId }).exec();
  }
}
