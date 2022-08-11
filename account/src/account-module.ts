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
    MongooseModule.forRoot(`mongodb://${process.env.ACC_DB_USER}:${process.env.ACC_DB_PASSWORD}@${process.env.ACC_DB_URL}:${process.env.ACC_DB_PORT}/${process.env.ACC_DB_NAME}`),
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountModel,
      },
    ]),
    JwtModule.register({
      secret: process.env.ACC_SECRET_KEY,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule { }
