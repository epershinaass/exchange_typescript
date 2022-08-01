import { Body, Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AddProductsDto, GetProductDto } from './dto/add-products.dto';
import { IProductsService } from './interfaces/grpc.interface';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5001',
    package: 'products',
    protoPath: join(__dirname, './proto/products.proto'),
  },
};

@Controller()
export class ProductsController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;
  private productService: IProductsService;

  onModuleInit() {
    this.productService =
      this.client.getService<IProductsService>('ProductsController');
  }

  @GrpcMethod('ProductsController', 'AddProduct')
  addProduct(@Body() addProductsDto: AddProductsDto) {
    return this.productService.addProduct(addProductsDto);
  }

  @GrpcMethod('ProductsController', 'GetProducts')
  getProducts(@Body() getProductDto: GetProductDto) {
    return this.productService.getProducts(getProductDto);
  }
}
