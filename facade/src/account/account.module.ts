import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { NAME, CLIENT_OPTS } from './constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CLIENT_OPTS,
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NAME.toLowerCase(),
            url: `${config.get<string>(`${NAME}_URL`)}:${config.get<string>(
              `${NAME}_PORT`,
            )}`,
            protoPath: join(__dirname, `./proto/${NAME.toLowerCase()}.proto`),
          },
        }),
      },
    ]),
  ],
  controllers: [AccountController],
})
export class AccountModule {}
