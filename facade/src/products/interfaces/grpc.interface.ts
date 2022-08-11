import { AddProductsDto, GetProductDto } from '../dto/add-products.dto';

export interface IProductsService {
  getProducts(getProductDto: GetProductDto): Promise<IProduct[]>;
  addProduct(addProductDto: AddProductsDto): Promise<IProduct>;
}

export interface IProduct {
  name: string;
  count: number;
  id?: string;
}

