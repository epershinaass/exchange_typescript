import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';

@Module({
  imports: [],
  controllers: [BalanceController, ProductsController],
  providers: [],
})
export class AppModule { }
