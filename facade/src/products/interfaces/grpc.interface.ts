import { Observable } from 'rxjs';
import { GetProductDto } from '../dto/add-products.dto';

export interface IGrpcService {
  getProducts(getProductDto: GetProductDto): Observable<any>;
  addProduct(addProductRequest: IAddProductRequest): Observable<any>;
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
