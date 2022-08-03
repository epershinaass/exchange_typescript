import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account-model'
import { ICredentials, IAuthMessage } from './msg/account-grpc-interface'
import { codes, messages } from './msg/account-err';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) { }

  private secret: string = this.configService.get('ACC_SECRET_KEY');

  public async signIn(creds: ICredentials): Promise<string> {
    const account = await this.accountModel.findOne({ login: creds.login });

    if (!account)
      throw codes.NOT_FOUND;
    if (account?.password !== creds.password)
      throw codes.UNAUTHENTICATED;

    const payload = { username: account.login, sub: account._id }
    return this.jwtService.sign(payload);
  }

  public async signUp(creds: ICredentials): Promise<string> {
    const account = await this.accountModel.findOne({ login: creds.login });

    if (account)
      throw codes.ALREADY_EXISTS;

    const isAccountCreated = await this.accountModel.create(creds);
    if (isAccountCreated)
      return messages.USER_MD;

    throw codes.ABORTED;
  }

  public async isAuth(auth: IAuthMessage): Promise<string> {
    try {
      return JSON.stringify(this.jwtService.verify(auth.token, { secret: this.secret }));
    } catch (err) {
      throw codes.UNAUTHENTICATED;
    }
  }
}