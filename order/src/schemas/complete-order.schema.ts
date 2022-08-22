import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';

export type OrderDocument = CompleteOrder & Document;

@Schema()
export class CompleteOrder {

  @Prop()
  startTime: Date;

  @Prop()
  balanceTaken: boolean;

  @Prop()
  productsTaken: boolean;

  @Prop()
  productGiven: boolean;

  @Prop()
  balanceGiven: boolean;

  @Prop()
  sellOrder: string;

  @Prop()
  buyOrder: string;

}

export const CompleteOrderSchema = SchemaFactory.createForClass(CompleteOrder);