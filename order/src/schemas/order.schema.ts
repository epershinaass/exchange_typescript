import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

  @Prop({ type: mongoose.Types.ObjectId })
  order_id: string

  @Prop({ type: mongoose.Types.ObjectId })
  user_id: string

  @Prop({ type: mongoose.Types.ObjectId })
  product_id: string

  @Prop()
  quantity: number

  @Prop()
  cost: number

  @Prop()
  order_type: number

  @Prop()
  is_full_size: boolean

}

export const OrderSchema = SchemaFactory.createForClass(Order);