import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { IAddProductRequest, IUserId } from './interfaces/object.interface';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async addProduct(addProductRequest: IAddProductRequest): Promise<string> {
    const product = await this.productModel.findOne({ userId: addProductRequest.userId });
    product.products.push(addProductRequest.product);
    await product.save();
    return 'Success';
  }
  public async getProducts(userId: IUserId): Promise<any> {
    return this.productModel.findOne({ userId: userId.userId }).exec();
  }

}
