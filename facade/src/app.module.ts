import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';
import { AccountController } from './account/account.controller';

@Module({
  imports: [],
  controllers: [BalanceController, AccountController],
  providers: [],
})
export class AppModule { }
