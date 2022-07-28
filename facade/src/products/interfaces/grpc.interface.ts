import { Observable } from 'rxjs';
import { GetProductDto } from '../dto/add-products.dto';

export interface IGrpcService {
  getProducts(getProductDto: GetProductDto): Promise<IProduct[]>;
  addProduct(addProductRequest: IAddProductRequest): Promise<string>;
}

export interface IProduct {
  productName: string;
  productCount: number;
  productId?: string;
}

export interface IAddProductRequest {
  userId: string;
  product: IProduct;
}

export interface IUserId {
  userId: string;
}
