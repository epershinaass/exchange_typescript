import { Body, Controller } from '@nestjs/common';
import { AccountService } from './account-service';
import { GrpcMethod } from '@nestjs/microservices';
import { getGrpcErr, codes } from './msg/account-err';
import { AuthMessageDto, CredentialsDto, MessageDto } from './msg/account-dto';


@Controller()
export class AccountController {
  constructor(private accountService: AccountService) { }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto, metadata: any): Promise<AuthMessageDto> {
    let token: string | number;
    try {
      token = await this.accountService.signIn(creds);
    } catch(err) {
      token = codes.UNKNOWN;
    }
    if (typeof token === 'string') return new AuthMessageDto(token);
    throw getGrpcErr(token);
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto, metadata: any): Promise<MessageDto> {
    let message: string | number;
    try {
      message = await this.accountService.signUp(creds);
    } catch (err) {
      message = codes.UNKNOWN
    }
    if (typeof message === 'string') return new MessageDto(message);
    throw getGrpcErr(message);
  }

  @GrpcMethod('AccountController', 'IsAuth')
  async isAuth(@Body() auth: AuthMessageDto, metadata: any): Promise<MessageDto> {
    let message: string | number;
    try {
      message = await this.accountService.isAuth(auth);
    } catch (err) {
      message = codes.UNKNOWN
    }
    if (typeof message === 'string') return new MessageDto(message);
    throw getGrpcErr(message);
  }
}
