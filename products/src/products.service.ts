import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async allProducts(dto: CreateProductDTO): Promise<Product> {
    const product = await this.productModel.create(dto);
    return product.save();
  }
}
