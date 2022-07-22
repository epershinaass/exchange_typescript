import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';

const userProducts = [];

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  public allProducts(data: object): any {
    const newBase = new this.productModel(...userProducts);
    userProducts.push(data);
    this.productModel.findOneAndUpdate(userProducts);
    newBase.save();
    console.log(newBase);
    return userProducts;
  }
}
