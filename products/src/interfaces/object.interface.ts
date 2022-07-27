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

export interface IResponseProductList {
  products: object;
}