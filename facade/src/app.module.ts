import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';

@Module({
  imports: [],
  controllers: [BalanceController],
  providers: [],
})
export class AppModule { }
