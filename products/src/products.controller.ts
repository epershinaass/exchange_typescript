import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IProductObject } from './interfaces/object.interface';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @GrpcMethod('ProductsController', 'AllProducts')
  async allProducts(data: IProductObject, userId: any) {
    return await this.productsService.allProducts(data, userId);
  }
}