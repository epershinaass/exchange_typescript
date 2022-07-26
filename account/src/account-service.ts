import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account-model'
import { ICredentials, IAuthMessageOrErr, IMessageOrErr, IAuthMessage, IAccountService } from './msg/account-grpc-interface'
import { codes } from './msg/account-err';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private jwtService: JwtService,
  ) { }

  public async signIn(creds: ICredentials): Promise<string | codes> {
    const account = await this.accountModel.findOne({ login: creds.login });
    if (!account)
      return codes.NOT_FOUND;
    if (account?.password !== creds.password)
      return codes.UNAUTHENTICATED;
      const payload = { username: account.login, sub: account._id}
    return this.jwtService.sign(payload);
  }

  public async signUp(creds: ICredentials): Promise<string | codes> {
    console.log(creds)
    if (await this.accountModel.findOne({ login: creds.login }))
      return codes.ALREADY_EXISTS;
    if (await this.accountModel.create(creds))
      return 'user created';
    else
      return codes.ABORTED;
  }


  public async isAuth(auth: IAuthMessage): Promise<string | codes> {
    try {
      return JSON.stringify(this.jwtService.verify(auth.token, {secret: 'TheVerySecretKey'}));
    } catch (err) {
      return codes.UNAUTHENTICATED;
    }
  }
}