import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { IOrderService } from './interfaces/grpc.interface';
import { CLIENT_OPTS } from './constatns/constants';
import { OrderRequestDto, OrderResponseDto } from './dto/order.dto';

@Controller()
export class OrderController implements OnModuleInit {
  constructor(@Inject(CLIENT_OPTS) private client: ClientGrpc) {}

  private orderService: IOrderService;

  onModuleInit() {
    this.orderService =
      this.client.getService<IOrderService>('OrderController');
  }

  @GrpcMethod()
  async createOrder(@Body() order: OrderRequestDto) {
    const status: Observable<OrderResponseDto> =
      this.orderService.createOrder(order);
    return await lastValueFrom(status);
  }

  @GrpcMethod()
  async getBalance() {
    this.orderService.getOrders();
  }
}
