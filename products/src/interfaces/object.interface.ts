export interface IProduct {
  productName: string;
  productCount: number;
  productId?: string;
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