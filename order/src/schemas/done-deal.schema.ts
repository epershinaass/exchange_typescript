import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DoneDealDocument = DoneDeal & Document;

@Schema()
export class DoneDeal {
  @Prop()
  date: Date;

  @Prop({ type: mongoose.Types.ObjectId })
  sellerUserId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  buyerUserId: string;

  @Prop({ type: mongoose.Types.ObjectId })
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  cost: number;
}

export const DoneDealSchema = SchemaFactory.createForClass(DoneDeal);
