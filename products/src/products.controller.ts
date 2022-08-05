import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { IAddProductRequest, IGetProductResponse, IUserId } from './interfaces/object.interface';
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
    return await this.productsService.addProduct(addProductRequest);
  }


  @GrpcMethod('ProductsController', 'GetProducts')
  async getProducts(userId: IUserId): Promise<IGetProductResponse> {
    if (!checkForObjectId.test(userId.userId)) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    const UserProducts = await this.productsService.getProducts(userId);
    return { products_list: UserProducts.products_list };
  }
}
