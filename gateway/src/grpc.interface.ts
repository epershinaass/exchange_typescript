import { Observable } from 'rxjs';

export interface IGrpcService {
  allProducts(Object: IProductObject): Observable<any>;
}

interface IProductObject {
  productId: string;
  productsName: string;
  productCount: number;
}
