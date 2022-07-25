import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account-model'
import { ICredentials, IAuthMessageOrErr, IMessageOrErr, IAuthMessage, IAccountService } from './msg/account-grpc-interface'
import { getGrpcError, codes } from './msg/account-err';
import jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const tokenKey = '1a2b-3c4d-5e6f-7g8h'

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) { }

  public async signIn(creds: ICredentials): Promise<IAuthMessageOrErr> {
    if (creds && (creds.login && creds.password)) {
      const account = await this.accountModel.findOne({ login: creds.login });

      if (!account)
        return getGrpcError(codes.NOT_FOUND);
      if (account?.password != creds.password)
        return getGrpcError(codes.UNAUTHENTICATED);

      return {
        login: creds.login,
        token: jwt.sign({ id: creds.login }, tokenKey)
      };
    }
    return getGrpcError(codes.INVALID_ARGUMENT);

  }


  public async signUp(creds: ICredentials): Promise<IMessageOrErr> {
    if(await this.accountModel.findOne({ login: creds.login }))
      return getGrpcError(codes.ALREADY_EXISTS);
    if(await this.accountModel.create(creds))
      return {message:`user ${creds.login} maked`};
    else
      return getGrpcError(codes.ABORTED);
  }


  public async isAuth(auth: IAuthMessage): Promise<IMessageOrErr> {
    try {
      return {message: jwt.verify(auth.login, tokenKey)};
    } catch (err) {
      return getGrpcError(codes.UNAUTHENTICATED);
    }
  }
}