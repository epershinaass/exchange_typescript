import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IProductObject } from 'src/interfaces/object.interface';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

@Prop({
  type: [
    {
      productName: { type: String },
      productCount: { type: Number },
    },
  ],
})
products: IProductObject[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);