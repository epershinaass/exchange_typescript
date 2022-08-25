import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DealDocument = Deal & Document;

@Schema()
export class Deal {
  @Prop()
  startTime: Date;

  @Prop()
  balanceTaken: boolean;

  @Prop()
  productTaken: boolean;

  @Prop()
  productGiven: boolean;

  @Prop()
  balanceGiven: boolean;

  @Prop()
  sellOrder: string;

  @Prop()
  buyOrder: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
