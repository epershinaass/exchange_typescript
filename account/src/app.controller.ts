import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Credentials, AuthToken } from './grpc.interface'


@Controller()
export class AppController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AppController', 'signIn')
  signIn(credentials: Credentials, metadata: any): AuthToken {
    return { token: this.accountService.signIn(credentials) };
  }
}
