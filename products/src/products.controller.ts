import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IObject } from './interfaces/object.interface';
import { IArrayOfObjects } from './interfaces/arrayOfObject.interface';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @GrpcMethod('ProductsController', 'Accumulate')
  accumulate(object: IObject, metadata: any): IArrayOfObjects {
    return {total: this.productsService.accumulate(object) };
  }
}