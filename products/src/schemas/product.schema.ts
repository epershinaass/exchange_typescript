import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

@Prop()
productId: string;

@Prop()
productName: string;

@Prop()
productCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);