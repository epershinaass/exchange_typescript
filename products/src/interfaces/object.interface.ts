export interface IProduct {
  name: string;
  count: number;
  id?: string;
}

export interface IUserId {
  userId: string;
}

export interface IAddProductRequest {
  userId: IUserId;
  product: IProduct;
}

export interface IGetProductResponse {
  products: IProduct[];
}