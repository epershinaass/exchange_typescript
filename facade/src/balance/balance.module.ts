import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    ClientsModule.register([
      {
        name: 'BALANCE_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'balance',
          url: `${process.env.BALANCE_URL}:${process.env.BALANCE_PORT}`,
          protoPath: join(__dirname, './proto/balance.proto'),
        },
      }
    ]),
  ],
  controllers: [BalanceController],
})
export class BalanceModule { }
