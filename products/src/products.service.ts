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

  public async addFreezeProduct(userId, productId, quantityForFreeze) {
    return await this.productModel
      .findOneAndUpdate(
        {
          $and: [
            { userId },
            {
              'frozenProducts.productId': productId,
            },
          ],
        },
        {
          $inc: {
            'frozenProducts.$.quantity': Number(quantityForFreeze),
          },
        },
        {
          new: true,
        },
      )
      .exec();
  }

  public async newFreezeProduct(userId, productId, quantityForFreeze) {
    return await this.productModel
      .findOneAndUpdate(
        { userId },
        {
          $push: {
            frozenProducts: {
              productId,
              quantity: quantityForFreeze,
            },
          },
        },
        {
          new: true,
        },
      )
      .exec();
  }

  public async freezeProduct(orderRequestDto: OrderRequestDto) {
    const userProducts = await this.getProducts({
      userId: orderRequestDto.order.userId,
    });

    const productForFreezeQuantity =
      userProducts.products.find(
        (products) => products.productId === orderRequestDto.order.productId,
      )?.quantity || 0;

    const userFrozenProductsQuantity =
      userProducts.frozenProducts.find(
        (products) => products.productId === orderRequestDto.order.productId,
      )?.quantity || 0;

    if (productForFreezeQuantity) {
      const canWeFreeze =
        BigInt(productForFreezeQuantity) - BigInt(userFrozenProductsQuantity) >=
        BigInt(orderRequestDto.order.quantity);

      if (canWeFreeze) {
        if (userFrozenProductsQuantity > 0) {
          this.addFreezeProduct(
            orderRequestDto.order.userId,
            orderRequestDto.order.productId,
            orderRequestDto.order.quantity,
          );
        } else {
          this.newFreezeProduct(
            orderRequestDto.order.userId,
            orderRequestDto.order.productId,
            orderRequestDto.order.quantity,
          );
        }
        return true;
      }
      return false;
    }
  }
}
