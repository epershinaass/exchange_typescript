import { Observable } from 'rxjs';

export interface IGrpcService {
  allProducts(Object: IProductObject): Observable<any>;
}

interface IProductObject {
  productsName: string;
  productCount: number;
}
