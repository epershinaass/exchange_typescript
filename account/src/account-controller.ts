import { Body, Controller, UseFilters } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { AnyExceptionFilter } from './msg/account-err';
import { AuthTokenDto, CredentialsDto, MessageDto } from './msg/account-dto';


@Controller()
@UseFilters(AnyExceptionFilter)
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto, metadata: any): Promise<AuthTokenDto> {
    return await this.accountService.signIn(creds);
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto, metadata: any): Promise<MessageDto> {
    return await this.accountService.signUp(creds);
  }

  @GrpcMethod('AccountController', 'Verify')
  async verify(@Body() auth: AuthTokenDto, metadata: any): Promise<MessageDto> {
    return await this.accountService.verify(auth);
  }
}
