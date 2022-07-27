import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IProduct } from 'src/interfaces/object.interface';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

@Prop({type: mongoose.Types.ObjectId})
userId: string

@Prop({
  type: [
    {
      productName: { type: String },
      productCount: { type: Number },
    },
  ],
})
products: IProduct[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);