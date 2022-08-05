export interface IProduct {
  name: string;
  quantity: number;
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