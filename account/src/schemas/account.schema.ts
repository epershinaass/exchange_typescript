import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
  login: string;
  @Prop()
  password: string;
}

export const AccountModel = SchemaFactory.createForClass(Account);
