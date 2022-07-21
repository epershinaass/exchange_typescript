import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { Balance, BalanceSchema } from './schemas/balance.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myapp'),
    MongooseModule.forFeature([
      {
        name: Balance.name,
        schema: BalanceSchema,
      },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule { }
