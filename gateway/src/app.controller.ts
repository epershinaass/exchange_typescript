import { Body, Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';

class AddProductsDto {
  productsName: string;
  productCount: number;
}

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;
  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('ProductsController');
  }

  @GrpcMethod('ProductController', 'AllProducts')
  async allProducts(@Body() addProductsDto: AddProductsDto) {
    return this.grpcService.allProducts(addProductsDto);
  }
}
