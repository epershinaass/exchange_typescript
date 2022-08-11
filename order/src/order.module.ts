import { Module } from '@nestjs/common';
import { OrderController as OrderController } from './order.controller';
// import { AppService as OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  // providers: [OrderService],
})
export class OrderModule {}
