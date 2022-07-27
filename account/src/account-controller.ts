import { Controller } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICredentialsRequest, IAuthMessage, IResponse } from './msg/account-grpc-interface'
import { getGrpcErr, codes } from './msg/account-err';
import { AuthMessageDto, MessageDto } from './msg/account-dto';


@Controller()
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(creds: ICredentialsRequest, metadata: any): Promise<IAuthMessage> {
    return this.accountService.signIn(creds)
    .catch(err => {
      return codes.UNKNOWN;
    })
    .then(res => {
     if (typeof res === 'string') return new AuthMessageDto(res);
     if (typeof res === 'number') throw getGrpcErr(res);
    });
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(creds: ICredentialsRequest, metadata: any): Promise<IResponse> {
    return this.accountService.signUp(creds)
    .catch(err => {
      return codes.UNKNOWN;
    })
    .then(res => {
    if (typeof res === 'string') return new MessageDto(res);
    if (typeof res === 'number') return getGrpcErr(res);
    });

  }

  @GrpcMethod('AccountController', 'IsAuth')
  async isAuth(auth: IAuthMessage, metadata: any): Promise<IResponse> {
    return this.accountService.isAuth(auth).catch(err => {
      return codes.UNKNOWN;
    })
    .then(res => {
    if (typeof res === 'string') return new MessageDto(res);
    if (typeof res === 'number') return getGrpcErr(res);
    });
  }
}