import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'example.env' }),
    AccountModule,
    BalanceModule,
    ProductsModule,
  ],
  providers: [],
})
export class AppModule { }
