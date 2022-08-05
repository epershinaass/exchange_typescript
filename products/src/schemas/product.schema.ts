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
      name: { type: String },
      quantity: { type: Number },
    },
  ],
})
products_list: IProduct[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);