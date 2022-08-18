import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRequestDto } from './dto/order-request.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { errCode } from './errors/balance.error';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) {}

  public async refillBalance(
    refillBalanceDto: RefillBalanceDto,
  ): Promise<IBalance> {
    // операция атомарна, перезаписи документа не будет
    // transaction_id генерируется на фасаде и проверяется в контроллере
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

  public async freezeSum(orderRequestDto: OrderRequestDto): Promise<boolean> {
    const sumForFreeze: bigint =
      BigInt(orderRequestDto.order.cost) *
      BigInt(orderRequestDto.order.quantity);

    const balance = await this.getBalance(orderRequestDto.order.userId);
    if (balance.total - balance.frozen >= sumForFreeze) {
      this.balanceModel
        .findOneAndUpdate(
          { userId: orderRequestDto.order.userId },
          {
            // потеря точности?
            $inc: { frozen: Number(sumForFreeze) },
          },
          {
            new: true,
          },
        )
        .exec();
      return true;
    }
    return false;
  }

  public async getBalance(userId): Promise<IBalance> {
    const balance = await this.balanceModel.findOne({ userId: userId }).exec();
    if (!balance) {
      throw errCode.NOT_FOUND;
    }
    return balance;
  }
}
