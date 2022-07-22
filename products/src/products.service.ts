import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';

// const userProducts = [];

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private balanceModel: Model<ProductDocument>,
  ) { }

  public allProducts(data: object): any {
    // userProducts.push(data);
    return this.balanceModel.;
  }
}
