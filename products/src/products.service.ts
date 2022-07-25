import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { IProductObject } from './interfaces/object.interface';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async allProducts(data, userId): Promise<object> {
    const product = await this.productModel.findById(userId);
    product.products.push(data);
    return product.save();
  }
}
