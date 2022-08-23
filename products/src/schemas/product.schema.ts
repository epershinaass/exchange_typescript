import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IProduct } from 'src/interfaces/products.interfaces';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;

  @Prop({
    type: [
      {
        quantity: { type: Number },
        productId: { type: String },
      },
    ],
  })
  frozenProducts: Object[];

  @Prop({
    type: [
      {
        quantity: { type: Number },
        productId: { type: String },
      },
    ],
  })
  products: IProduct[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
