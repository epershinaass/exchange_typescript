import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService, Credentials, AuthToken } from './grpc.interface';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  @Get('/sign-in')
  async signIn(@Body('credentials') credentials: Credentials) {
    return this.grpcService.signIn(credentials);
  }
}
