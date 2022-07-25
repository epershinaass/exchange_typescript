import { Observable } from 'rxjs';

export interface IGrpcService {
  addProducts(addProductRequest: IAddProductRequest): Observable<any>;
}

export interface IProduct {
  productName: string;
  productCount: number;
  productId?: string;
}

export interface IAddProductRequest {
  userProductsId: string;
  product: IProduct;
}
