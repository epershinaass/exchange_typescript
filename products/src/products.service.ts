import { Injectable } from "@nestjs/common";
// import {ISumOfNumberArray} from "./app.controller";
type ProductResponse = {product_id: number, name: string, quantity: number }

@Injectable()
export class ProductsService {
  public accumulate(userId: number):ProductResponse[] {
    // return UserProducts[userId];
    return UserProducts;
  }
}

// const Number = 1;


const UserProducts =
    // [
[
  { product_id: 1000, name: "HI", quantity: 1 },
  { product_id: 1001, name: "HI2", quantity: 1 }
]
// [
//   { product_id: 1000,  name: "HI",  quantity: 1 },
//   { product_id: 1001, name: "HI2",  quantity: 1 }
// ]
// ];


