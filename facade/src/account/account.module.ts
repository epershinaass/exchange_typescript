import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: 'example.env',
    // }),
    // ConfigModule,
    ClientsModule.registerAsync([
      {
        inject:[ConfigService],
        useFactory: (config: ConfigService) => {}
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
  controllers: [AccountController],
})
export class AccountModule { }
