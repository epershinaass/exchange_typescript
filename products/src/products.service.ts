import { Product } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import {
  IAddProductRequest,
  IUserId,
  IUserProductsDocument,
} from './interfaces/products.interfaces';
import { errCode } from './errors/products.error';
import { Catalog, CatalogDocument } from './schemas/productsCollection.schema';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>,
  ) {}

  public async addProduct(
    addProductRequest: IAddProductRequest,
  ): Promise<object> {
    const product = await this.productModel.findOne({
      userId: addProductRequest.userId,
    });
    const catalog = await this.catalogModel.findOne({
      productId: addProductRequest.product.productId,
    });
    if (!product) {
      throw errCode.NOT_FOUND;
    } else if (!catalog) {
      throw errCode.NOT_FOUND;
    }
    product.products.push(addProductRequest.product);
    return await product.save();
  }

  public async getProducts(userId: IUserId): Promise<IUserProductsDocument> {
    const userProducts = await this.productModel
      .findOne({ userId: userId.userId })
      .exec();
    if (!userProducts) {
      throw errCode.NOT_FOUND;
    }
    return userProducts;
  }


  public async freezeProduct(orderRequestDto: OrderRequestDto) {
    const quantityForFreeze: bigint = BigInt(orderRequestDto.order.quantity);

    const frozenProductsId = orderRequestDto.order.productId;
    const product = await this.getProducts({ userId: orderRequestDto.order.userId });
    // const productsToBeFrozen = product.products.filter(
    //   (frozenProductsId) => frozenProductsId === { productId: product.products.productId });
    console.log(product)
    return product;
  //   if (product.products - balance.frozen >= sumForFreeze) {
  //     this.balanceModel
  //       .findOneAndUpdate(
  //         { userId: orderRequestDto.order.userId },
  //         {
  //           // TODO: потеря точности!!!хранить как string?
  //           $inc: { frozen: Number(sumForFreeze) },
  //         },
  //         {
  //           new: true,
  //         },
  //       )
  //       .exec();
  //     return true;
  //   }
  //   return false;
  // }

}}
