import { Body, Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { AddProductsDto } from './dto/add-products.dto';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;
  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('ProductsController');
  }

  @GrpcMethod('ProductController', 'AddProducts')
  async addProducts(@Body() addProductsDto: AddProductsDto) {
    return this.grpcService.addProducts(addProductsDto);
  }
}
