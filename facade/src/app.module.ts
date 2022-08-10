import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';
import { AccountModule } from './account/account-module';

@Module({
  imports: [AccountModule],
  controllers: [BalanceController],
  providers: [],
})
export class AppModule { }
