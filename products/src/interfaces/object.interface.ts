export interface IProduct {
  productName: string;
  productCount: number;
}

export interface IAddProductRequest {
  userProductsId: string;
  product: IProduct;
}