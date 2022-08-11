import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account-module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), AccountModule],
  controllers: [BalanceController, ProductsController],
  providers: [],
})
export class AppModule { }
