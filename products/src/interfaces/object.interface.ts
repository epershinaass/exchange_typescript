export interface IProduct {
  productName: string;
  productCount: number;
  productId?: string;
}

export interface IAddProductRequest {
  userProductsId: string;
  product: IProduct;
}

export interface IUserProductsId {
  userProductsId: string;
}

export interface IResponseProductList {
  products: object;
}