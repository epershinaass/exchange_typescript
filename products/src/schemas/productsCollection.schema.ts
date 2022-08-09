import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {

  @Prop()
  name: string

}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);