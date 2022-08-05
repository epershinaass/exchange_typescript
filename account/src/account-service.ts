import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account-model'
import { codes, messages } from './msg/account-err';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AuthTokenDto, CredentialsDto, MessageDto } from './msg/account-dto';


@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) { }

  private secret: string = this.configService.get('ACC_SECRET_KEY');

  public async signIn(creds: CredentialsDto): Promise<AuthTokenDto> {
    const account = await this.accountModel.findOne({ login: creds.login });
    if (!account) throw codes.NOT_FOUND;
    if (account?.password !== creds.password) throw codes.UNAUTHENTICATED;

    const payload = { username: account.login, sub: account._id };
    const token = this.jwtService.sign(payload);

    return new AuthTokenDto(token);
  }


  public async signUp(creds: CredentialsDto): Promise<MessageDto> {
    const account = await this.accountModel.findOne({ login: creds.login });
    if (account) throw codes.ALREADY_EXISTS;

    const AccountNotCreated = !await this.accountModel.create(creds);
    if (AccountNotCreated) throw codes.ABORTED;

    return new MessageDto(messages.USER_MADE);
  }


  public async verify(auth: AuthTokenDto): Promise<MessageDto> {
    let verifyData;
    try {
      const verified = this.jwtService.verify(auth.token, { secret: this.secret })
      verifyData = JSON.stringify(verified);
    } catch (err) {
      throw codes.UNAUTHENTICATED;
    }
    return new MessageDto(verifyData);
  }
}