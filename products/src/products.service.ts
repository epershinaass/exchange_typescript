import { Injectable } from '@nestjs/common';

const userProducts = [];

@Injectable()
export class ProductsService {
  public allProducts(data): any {
    userProducts.push(data);
    return userProducts;
  }
}
