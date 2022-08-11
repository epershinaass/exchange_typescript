import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CredentialsDto, AuthTokenDto, MessageDto } from './dto/account-dto';
import { IAccountGrpcService } from './interface/account-grpc-interface';


@Controller()
export class AccountController implements OnModuleInit {
  constructor(
    @Inject('ACCOUNT_GRPC_SERVICE') private client: ClientGrpc,
  ) {}

  private accountService: IAccountGrpcService;

  onModuleInit() {
    this.accountService =
      this.client.getService<IAccountGrpcService>('AccountController');
  }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto): Promise<AuthTokenDto> {
      return await firstValueFrom(this.accountService.signIn(creds))
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
      return await firstValueFrom(this.accountService.signUp(creds))
  }

  @GrpcMethod('AccountController', 'Verify')
  async verify(@Body() auth: AuthTokenDto): Promise<MessageDto> {
      return await firstValueFrom(this.accountService.verify(auth))
  }
}
