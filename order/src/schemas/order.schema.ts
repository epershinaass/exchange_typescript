import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ default: false })
  isFrozen: boolean;

  @Prop({ type: mongoose.Types.ObjectId })
  orderId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  cost: number;

  @Prop()
  orderType: number;

  @Prop()
  isFullSize: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
