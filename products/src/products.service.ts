import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { IAddProductRequest } from './interfaces/object.interface';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async addProduct(addProductRequest: IAddProductRequest): Promise<object> {
    const product = await this.productModel.findById(addProductRequest.userProductsId);
    product.products.push(addProductRequest.product);
    return product.save();
  }
}
