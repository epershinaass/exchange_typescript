import { IProduct } from "src/grpc.interface";

export class AddProductsDto {
  userProductsId: string;
  product: IProduct
}
