import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoveResourcesDto } from './dto/move-resources.dto';
import { OrderRequestDto } from './dto/order-request.dto';
import { errCode } from './errors/products.error';
import { IAddProductRequest } from './interfaces/products.interfaces';
import { Product, ProductDocument } from './schemas/product.schema';
import { Catalog, CatalogDocument } from './schemas/productsCollection.schema';

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
    if (!product) {
      throw errCode.NOT_FOUND;
    }
    const catalog = await this.catalogModel.findOne({
      productId: addProductRequest.product.productId,
    });
    if (!catalog) {
      throw errCode.NOT_FOUND;
    }
    const oldProductIdx = product.products.findIndex(
      (el) => el.productId === addProductRequest.product.productId,
    );
    if (oldProductIdx === -1) {
      product.products.push(addProductRequest.product);
    } else {
      product.products[oldProductIdx].quantity += Number(
        addProductRequest.product.quantity,
      );
    }
    return await product.save();
  }

  public async getProducts(userId: string): Promise<any> {
    const userProducts = await this.productModel.findOne({ userId }).exec();
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

  public async takeFrozenProducts(order: MoveResourcesDto) {
    this.productModel
      .findOneAndUpdate(
        {
          $and: [
            { userId: order.orderForSell.userId },
            {
              'frozenProducts.productId': order.orderForSell.productId,
            },
          ],
        },
        {
          $inc: {
            'frozenProducts.$.quantity': -order.orderForSell,
            quantity: -order.orderForSell,
          },
        },
        {
          new: true,
        },
      )
      .exec();
  }

  public async giveProducts(order: MoveResourcesDto) {
    this.addProduct({
      userId: order.orderForBuy.userId,
      product: {
        quantity: order.orderForSell.quantity,
        productId: order.orderForSell.orderId,
      },
    });
  }

  public async freezeProduct(orderRequestDto: OrderRequestDto) {
    const userProducts = await this.getProducts(orderRequestDto.order.userId);

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
