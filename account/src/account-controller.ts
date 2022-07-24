import { Controller } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { Credentials, AuthToken } from './account-grpc-interface'
import { resolve } from 'path';


@Controller()
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'signIn')
  async signIn(credentials: Credentials, metadata: any): Promise<AuthToken | string> {
    return await this.accountService.signIn(credentials);
  }
}
