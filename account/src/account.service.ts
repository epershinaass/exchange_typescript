import { Injectable } from '@nestjs/common';
import { Credentials } from './grpc.interface';

@Injectable()
export class AccountService {
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

  public signIn(credentials: Credentials): string {
    if(!credentials) return 'error, body is empty';
    const user_password = users.get(credentials.login);
    if(!user_password || credentials.password != user_password)
      return 'invalid credentials';
    return 'YourAwesomeToken';
  }
}

const users = new Map();
users.set('Bel1sim0', 'qwerty123123');
users.set('TheQuickBuy', 'Qw2H2i!tY#2nL');