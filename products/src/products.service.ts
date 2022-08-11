import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { IAddProductRequest, IUserId, IUserProductsDocument } from './interfaces/products.interfaces';
import { errCode } from './errors/products.error';
import { Catalog, CatalogDocument } from './schemas/productsCollection.schema';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>,
  ) { }

  public async addProduct(addProductRequest: IAddProductRequest): Promise<object> {
    const product = await this.productModel.findOne({ userId: addProductRequest.userId });
    const catalog = await this.catalogModel.findOne({ name: addProductRequest.product.name });
    if (!product) {
      throw errCode.NOT_FOUND;
    } else if (!catalog) {
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
