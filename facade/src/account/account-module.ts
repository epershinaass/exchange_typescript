import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ClientsModule.register([
      {
        name: 'ACCOUNT_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          url: `${process.env.ACCOUNT_URL}:${process.env.ACCOUNT_PORT}`,
          protoPath: join(__dirname, './proto/account.proto'),
        },
      }
    ]),
  ],
  controllers: [ AccountController],
})
export class AccountModule { }
