import { Module } from '@nestjs/common';
import { AccountController } from './account-controller';
import { AccountService } from './account-service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccountModel, Account } from './account-model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://
${process.env.DB_URL ?? 'localhost'}:
${process.env.DB_PORT ?? '27017'}/
${process.env.DB_NAME ?? 'account'}`,
    ),
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountModel,
      },
    ]),
    JwtModule.register({
      secret: process.env.AUTH_SECRET_KEY??'TheVerySecretKey',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule { }