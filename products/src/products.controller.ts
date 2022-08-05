import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { IAddProductRequest, IGetProductsResponse, IUserId } from './interfaces/object.interface';
import { getGrpcError } from './errors/products.error';
import { status } from '@grpc/grpc-js';

const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @GrpcMethod('ProductsController', 'AddProduct')
  async addProduct(addProductRequest: IAddProductRequest): Promise<object> {
    if (!checkForObjectId.test(String(addProductRequest.userId))) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    try {
      const isAdded = await this.productsService.addProduct(addProductRequest);
      if (isAdded) {
        return { status: "OK" }
      }
      return { status: "NOT OK" }
    } catch (e) {
      throw new RpcException(getGrpcError(e));
    }
  }


  @GrpcMethod('ProductsController', 'GetProducts')
  async getProducts(userId: IUserId): Promise<IGetProductsResponse> {
    if (!checkForObjectId.test(userId.userId)) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    const userProducts = await this.productsService.getProducts(userId);
    return { products: userProducts.products };
  }
}
