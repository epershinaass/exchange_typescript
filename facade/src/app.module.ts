import { Module } from '@nestjs/common';
import { BalanceController } from './balance/balance.controller';
import { AccountController } from './account/account.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [BalanceController, AccountController],
  providers: [],
})
export class AppModule { }
