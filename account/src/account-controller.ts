import { Controller } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICredentials, IAuthMessage, IMessageOrErr, IAuthMessageOrErr, IAccountService } from './msg/account-grpc-interface'


@Controller()
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'signIn')
  async signIn(credentials: ICredentials, metadata: any): Promise<IAuthMessageOrErr> {
    return await this.accountService.signIn(credentials).catch();
  }

  @GrpcMethod('AccountController', 'signUp')
  async signUp(credentials: ICredentials, metadata: any): Promise<IMessageOrErr> {
    return await this.accountService.signUp(credentials).catch();
  }

  @GrpcMethod('AccountController', 'isAuth')
  async isAuth(authMessage: IAuthMessage, metadata: any): Promise<IMessageOrErr> {
    return await this.accountService.isAuth(authMessage).catch();
  }
}
