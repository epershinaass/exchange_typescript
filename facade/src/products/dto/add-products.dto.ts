import { IProduct } from "../interfaces/grpc.interface";

export class AddProductsDto {
  userId: string;
  product: IProduct
}

export class GetProductDto {
  userId: string;
}
