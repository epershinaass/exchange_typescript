import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BalanceDocument = Balance & Document;

@Schema()
export class Balance {
  @Prop()
  total: number;

  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;

  @Prop({
    type: [
      {
        transactionId: { type: String },
        currentBalance: { type: Number },
        refillSum: { type: Number },
        transactionTime: { type: Date },
      },
    ],
  })
  transactions: ITransaction[];
}

/* Сейчас сущности в бд хранятся примерно в таком виде:
{
  _id: new ObjectId("62d9aa25c79d1502fdf98d96"),
  total: 288,
  transactions: [ '404',  '202', '3222', '32122' ]
},
{
  _id: new ObjectId("62d9aa25c79d1502fdf98d97"),
  total: 322,
  transactions: [ '1',  '2', '3' ]
}
*/

export const BalanceSchema = SchemaFactory.createForClass(Balance);
