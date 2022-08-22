import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';

export type OrderDocument = CompleteOrder & Document;

@Schema()
export class CompleteOrder {

  @Prop({ type: mongoose.Types.ObjectId })
  userBuyerId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  userSellerId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  cost: number;

  @Prop()
  isFullSize: boolean;

  @Prop()
  date: Date;

}

export const CompleteOrderSchema = SchemaFactory.createForClass(CompleteOrder);