import { Controller, Res } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICredentials, IAuthMessage, IMessageOrErr, IAuthMessageOrErr, IAccountService, IAccountController } from './msg/account-grpc-interface'
import { getGrpcError, codes } from './msg/account-err';
import { AuthMessage, Message } from './msg/account-dto';


@Controller()
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(creds: ICredentials, metadata: any): Promise<IAuthMessageOrErr> {
    return this.accountService.signIn(creds)
    .catch(err => {
      return codes.UNKNOWN;
    })
    .then(res => {
      if (typeof res === 'number') return getGrpcError(res);
      if (typeof res === 'string') return new AuthMessage(creds.login, res);
//      if (res.pas === creds.password) return new AuthMessage(creds.login, res);
//      return getGrpcError(codes.UNAUTHENTICATED);
    });

  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(creds: ICredentials, metadata: any): Promise<IMessageOrErr> {
    return this.accountService.signUp(creds)
    .catch(err => {
      return codes.UNKNOWN;
    })
    .then(res => {
    if (typeof res === 'string') return new Message(res);
    if (typeof res === 'number') return getGrpcError(res);
    });

  }

  @GrpcMethod('AccountController', 'IsAuth')
  async isAuth(auth: IAuthMessage, metadata: any): Promise<IMessageOrErr> {
    return this.accountService.isAuth(auth).catch(err => {
      return codes.UNKNOWN;
    })
    .then(res => {
    if (typeof res === 'string') return new Message(res);
    if (typeof res === 'number') return getGrpcError(res);
    });
  }
}