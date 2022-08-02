import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { Balance, BalanceSchema } from './schemas/balance.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME_BALANCE}`,
    ),
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
