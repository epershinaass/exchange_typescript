import { IObject } from './../dist/interfaces/iObject.interface.d';
import { Injectable } from '@nestjs/common';

const userProducts = [];

@Injectable()
export class ProductsService {
  public accumulate(data): any {
    userProducts.push(data);
    return userProducts;
  }
}
