import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
  public accumulate(userId: number): any {
    return UserProducts[userId];
  }
}

const Number = 5;


const UserProducts = [
[
  { product_id: 1000, name: "HI", quantity: 1 },
  { product_id: 1001, name: "HI2", quantity: 1 }
],
[
  { product_id: 1000,  name: "HI",  quantity: 1 },
  { product_id: 1001, name: "HI2",  quantity: 1 }
]];


