import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [BalanceController, ProductsController],
  providers: [],
})
export class AppModule { }
