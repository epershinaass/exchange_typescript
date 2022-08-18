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

  public async getProducts(userId: IUserId): Promise<any> {
    const userProducts = await this.productModel
      .findOne({ userId: userId.userId })
      .exec();
    if (!userProducts) {
      throw errCode.NOT_FOUND;
    }
    return userProducts;
  }

  public async freezeProduct(orderRequestDto: OrderRequestDto) {
    const quantityForFreeze = BigInt(orderRequestDto.order.quantity);
    const frozenProductsId = orderRequestDto.order.productId;

    const product = await this.getProducts({
      userId: orderRequestDto.order.userId,
    });
    const productToBeFrozen = product.products.find(
      (products) => products.productId === frozenProductsId,
    );

    if (productToBeFrozen) {
      if (productToBeFrozen.quantity >= quantityForFreeze) {
        if (
          product.frozenProducts.find(
            (products) => products.productId === frozenProductsId,
          )
        ) {
          // Находим и обновляем
          const quantityTotalForFreeze =
            product.frozenProducts.quantity + quantityForFreeze;
          product
            .findOneAndUpdate(
              { userId: orderRequestDto.order.userId },
              {
                $inc: { 'frozenProducts.quantity': quantityTotalForFreeze },
              },
              {
                new: true,
              },
            )
            .exec();

          return true;
        } else {
          // Добавляем с нуля
          product.frozenProducts.push(
            orderRequestDto.order.productId,
            orderRequestDto.order.quantity,
          );
          return true;
        }
      }
      return false;
    }
    return false;
  }
}
