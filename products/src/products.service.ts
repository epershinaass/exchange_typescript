import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { IAddProductRequest, IUserId, IUserProductsDocument } from './interfaces/object.interface';
import { errCode } from './errors/products.error';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  public async addProduct(addProductRequest: IAddProductRequest): Promise<object> {
    const product = await this.productModel.findOne({ userId: addProductRequest.userId });
    if (!product) {
      throw errCode.NOT_FOUND;
    }
    product.products.push(addProductRequest.product);
    return await product.save();
  }

  public async getProducts(userId: IUserId): Promise<IUserProductsDocument> {
    const userProducts = await this.productModel.findOne({ userId: userId.userId }).exec();
    if (!userProducts) {
      throw errCode.NOT_FOUND;
    }
    return userProducts;
  }

}
