import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CLIENT_OPTS } from './constants';
import { CredentialsDto, AuthTokenDto, MessageDto } from './dto/account-dto';
import { IAccountGrpcService } from './interface/account-grpc-interface';
import { ConfigService } from '@nestjs/config';
const crypto = require('crypto');
import { join } from 'path';


@Controller()
export class AccountController implements OnModuleInit {
  constructor(@Inject(CLIENT_OPTS) private client: ClientGrpc, private configService: ConfigService) {}

  private accountService: IAccountGrpcService;
  private salt: string = this.configService.get('ACC_PASSW_SALT');
  onModuleInit() {
    this.accountService =
      this.client.getService<IAccountGrpcService>('AccountController');
  }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto): Promise<AuthTokenDto> {
    creds.password = crypto.pbkdf2Sync(creds.password, this.salt, 1, 64, 'sha512').toString();
    return await firstValueFrom(this.accountService.signIn(creds));
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
    return await firstValueFrom(this.accountService.signUp(creds));
  }

  @GrpcMethod('AccountController', 'Verify')
  async verify(@Body() auth: AuthTokenDto): Promise<MessageDto> {
    return await firstValueFrom(this.accountService.verify(auth));
  }
}
