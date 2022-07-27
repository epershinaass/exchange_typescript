import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IAddProductRequest, IUserId } from './interfaces/object.interface';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @GrpcMethod('ProductsController', 'AddProduct')
  async addProduct(addProductRequest: IAddProductRequest): Promise<string> {
    return await this.productsService.addProduct(addProductRequest);
  }
  @GrpcMethod('ProductsController', 'GetProducts')
  async getProducts(userId: IUserId) {
    const UserProducts = await this.productsService.getProducts(userId);
    return {products: UserProducts.products};
  }
}