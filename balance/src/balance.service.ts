import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRequestDto } from './dto/order-request.dto';
import { RefillBalanceDto } from './dto/refill-balance.dto';
import { MoveResourcesDto } from './dto/move-resources.dto';
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

  public async decreaseBalance(
    moveResourcesDto: MoveResourcesDto,
  ): Promise<boolean> {
    const persentForSell = BigInt(
      Math.ceil(
        (Number(moveResourcesDto.orderForSell.cost) / 100) *
          Number(moveResourcesDto.orderForSell.quantity),
      ),
    );

    const cost =
      BigInt(moveResourcesDto.orderForSell.cost) *
        BigInt(moveResourcesDto.orderForSell.quantity) +
      persentForSell;

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

    // console.log(cost);
    // console.log(sumForFreeze);

    await this.balanceModel
      .findOneAndUpdate(
        { userId: moveResourcesDto.orderForBuy.userId },
        {
          // TODO: не отнимает frozen
          $inc: { frozen: -Number(sumForFreeze), total: -Number(cost) },
          $push: {
            transactions: {
              transactionId: moveResourcesDto.orderForBuy.orderId,
              refillSum: -Number(cost),
              transactionTime: new Date(),
            },
          },
        },
      )
      .exec();
    return true;
  }

  public async increaseBalance(
    moveResourcesDto: MoveResourcesDto,
  ): Promise<boolean> {
    // операция атомарна, перезаписи документа не будет
    // transaction_id генерируется на фасаде и проверяется в контроллере
    this.balanceModel
      .findOneAndUpdate(
        { userId: moveResourcesDto.orderForSell.userId },
        {
          $inc: {
            total:
              moveResourcesDto.orderForBuy.cost *
              moveResourcesDto.orderForBuy.quantity,
          },
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
