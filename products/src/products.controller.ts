import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IAddProductRequest } from './interfaces/object.interface';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @GrpcMethod('ProductsController', 'AddProduct')
  async addProduct(addProductRequest: IAddProductRequest): Promise<string> {
    return await this.productsService.addProduct(addProductRequest);
  }
  @GrpcMethod('ProductsController', 'GetProduct')
     async getProduct(addProductRequest: IAddProductRequest): Promise<object> {
       return await this.productsService.getProduct(addProductRequest);
     }
}