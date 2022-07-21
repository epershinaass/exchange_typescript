import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    return this.grpcService.accumulate({ data });
  }
  @Get('add')
  async products(@Body('data') data: number[]) {
    return this.grpcService.accumulate({ data });
  }
}
