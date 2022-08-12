import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';
import { ConfigModule } from '@nestjs/config';
import { CreateIdController } from './common/create-id/createId.controller';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [BalanceController, ProductsController, CreateIdController],
  providers: [],
})
export class AppModule {}
