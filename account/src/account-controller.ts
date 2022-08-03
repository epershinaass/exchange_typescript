import { Body, Controller } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { getGrpcErr } from './msg/account-err';
import { AuthMessageDto, CredentialsDto, MessageDto } from './msg/account-dto';


@Controller()
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto, metadata: any): Promise<AuthMessageDto> {
    try {
      return new AuthMessageDto(await this.accountService.signIn(creds));
    } catch(err) {
      throw getGrpcErr(err);
    }
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto, metadata: any): Promise<MessageDto> {
    try {
      return new MessageDto(await this.accountService.signUp(creds));
    } catch(err) {
      throw getGrpcErr(err);
    }
  }

  @GrpcMethod('AccountController', 'IsAuth')
  async isAuth(@Body() auth: AuthMessageDto, metadata: any): Promise<MessageDto> {
    try {
      return new MessageDto(await this.accountService.isAuth(auth));
    } catch(err) {
      throw getGrpcErr(err);
    }
  }
}
