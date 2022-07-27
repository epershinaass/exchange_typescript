import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IAddProductRequest, IResponseProductList, IUserId } from './interfaces/object.interface';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @GrpcMethod('ProductsController', 'AddProduct')
  async addProduct(addProductRequest: IAddProductRequest): Promise<string> {
    return await this.productsService.addProduct(addProductRequest);
  }
  @GrpcMethod('ProductsController', 'GetProduct')
  async getProduct(userId: IUserId) {
    const UserProducts = await this.productsService.getProduct(userId);
    return {products: UserProducts.products};
  }
}