import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IArrayOfObjects, IObject } from './interfaces/object.interface';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @GrpcMethod('ProductsController', 'AllProducts')
  allProducts(data: IObject): IArrayOfObjects {
    return {total: this.productsService.allProducts(data)};
  }
}