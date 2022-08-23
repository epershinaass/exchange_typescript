import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRequestDto } from './dto/order-request.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { MoveResourcesDto } from './dto/move-resources.dto';
import { errCode } from './errors/balance.error';
import { Balance, BalanceDocument } from './schemas/balance.schema';
// import { Deal, DealDocument } from '../../order/src/schemas/deal.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
    // @InjectModel(Deal.name) private dealModel: Model<DealDocument>,
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

  public async decreaseBalance(
    moveResourcesDto: MoveResourcesDto
  ): Promise<Boolean> {
    // операция атомарна, перезаписи документа не будет
    // transaction_id генерируется на фасаде и проверяется в контроллере
    const cost = -moveResourcesDto.orderForBuy.cost * 1.01;
    const percent = BigInt(
      Math.ceil(
        (Number(moveResourcesDto.orderForBuy.cost) / 100) *
          Number(moveResourcesDto.orderForBuy.quantity),
      ),
    );

    const sumForFreeze: bigint =
      BigInt(moveResourcesDto.orderForBuy.cost) *
        BigInt(moveResourcesDto.orderForBuy.quantity) +
      percent;

        if (sumForFreeze || percent === undefined || null) {
          return false;
        };

    this.balanceModel
      .findOneAndUpdate(
        { userId: moveResourcesDto.orderForBuy.userId },
        {
          $inc: { total: cost, frozen: -sumForFreeze },
          $push: {
            transactions: {
              transactionId: moveResourcesDto.orderForBuy.orderId,
              refillSum: cost,
              transactionTime: new Date(),
            },
          },
        },
      )
      .exec();
    return true;
  }


  public async increaseBalance(
    moveResourcesDto: MoveResourcesDto
  ): Promise<Boolean> {
    // операция атомарна, перезаписи документа не будет
    // transaction_id генерируется на фасаде и проверяется в контроллере

    this.balanceModel
      .findOneAndUpdate(
        { userId: moveResourcesDto.orderForSell.userId },
        {
          $inc: { total: moveResourcesDto.orderForBuy.cost * moveResourcesDto.orderForBuy.quantity },
          $push: {
            transactions: {
              transactionId: moveResourcesDto.orderForSell.orderId,
              refillSum: moveResourcesDto.orderForBuy.cost,
              transactionTime: new Date(),
            },
          },
        },
      )
      .exec();
    return true;
  }

  public async freezeSum(orderRequestDto: OrderRequestDto): Promise<boolean> {
    const percent = BigInt(
      Math.ceil(
        (Number(orderRequestDto.order.cost) / 100) *
          Number(orderRequestDto.order.quantity),
      ),
    );

    const sumForFreeze: bigint =
      BigInt(orderRequestDto.order.cost) *
        BigInt(orderRequestDto.order.quantity) +
      percent;

    const balance = await this.getBalance(orderRequestDto.order.userId);
    if (balance.total - balance.frozen >= sumForFreeze) {
      this.balanceModel
        .findOneAndUpdate(
          { userId: orderRequestDto.order.userId },
          {
            // TODO: потеря точности!!!хранить как string?
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
