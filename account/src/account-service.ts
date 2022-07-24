import { Injectable } from '@nestjs/common';
import accountModel from './account-model'
import { createReadStream } from 'fs';
import { Credentials, AuthToken } from './account-grpc-interface'

@Injectable()
export class AccountService {

  public async signIn(creds: Credentials): Promise<AuthToken | string> {
    console.log('nya');
    if(!creds || !creds.login || !creds.password) {
      return 'error, body is empty';
    }
    const account = await accountModel.find();
    console.log(account.toString());
    //if(account?.password != creds.password)
      return 'invalid credentials';
    return  {token: 'YourAwesomeToken'};
  }

  // public async signUp(creds: Credentials): Promise<string> {
  //   return await accountModel.create(creds)?'user created':'error';
  // }

}

// const users = new Map();
// users.set('Bel1sim0', 'qwerty123123');
// users.set('TheQuickBuy', 'Qw2H2i!tY#2nL');