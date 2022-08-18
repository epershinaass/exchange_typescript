export interface IProduct {
  quantity: number;
  productId: string;
  id?: string;
}

export interface IUserId {
  userId: string;
}

export interface IAddProductRequest {
  userId: IUserId;
  product: IProduct;
}

export interface IGetProductsResponse {
  products: IProduct[];
}

export interface IUserProductsDocument {
  userId: string;
  products: IProduct[];
  frozenProducts: IProduct[];
}