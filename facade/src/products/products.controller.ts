import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { AddProductsDto, GetProductDto } from './dto/add-products.dto';
import { IProductsService } from './interfaces/grpc.interface';


@Controller()
export class ProductsController implements OnModuleInit {
  constructor(
    @Inject('PRODUCTS_GRPC_SERVICE') private client: ClientGrpc,
  ) {}

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
