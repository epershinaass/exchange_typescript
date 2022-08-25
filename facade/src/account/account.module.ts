import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { NAME, CLIENT_OPTS } from './constants';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { MyAuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
  providers: [
    AuthService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: MyAuthGuard,
    // }
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AccountModule {}
