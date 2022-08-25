import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateIdController } from './common/create-id/createId.controller';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, }),
    AccountModule,
    BalanceModule,
    ProductsModule,
    OrderModule,
  ],
  controllers: [CreateIdController],
  exports: [ConfigModule],
  providers: [],
})
export class AppModule { }
