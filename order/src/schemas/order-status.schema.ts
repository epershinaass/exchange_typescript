import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OrderStatusDocument = OrderStatus & Document;

@Schema()
export class OrderStatus {
  @Prop()
  status: number;

  @Prop()
  createdAt: Date;

  @Prop()
  message: string;

  @Prop()
  transactionId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  orderId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  productId: string;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  cost: number;

  @Prop()
  orderType: number;

  @Prop()
  isFullSize: boolean;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
