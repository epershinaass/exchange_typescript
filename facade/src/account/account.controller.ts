import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MyAuthGuard } from './auth.guard';
import { CLIENT_OPTS, MSERVICE_CONTROLLER } from './constants';
import { AuthTokenDto, CredentialsDto, MessageDto } from './dto/account-dto';
import { IAccountGrpcService } from './interface/account-grpc-interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public';

@Controller()
export class AccountController implements OnModuleInit {
  constructor(@Inject(CLIENT_OPTS) private client: ClientGrpc) {}

  private accountService: IAccountGrpcService;
  onModuleInit() {
    this.accountService =
      this.client.getService<IAccountGrpcService>(MSERVICE_CONTROLLER);
  }

  @Public()
  @GrpcMethod()
  async signIn(@Body() creds: CredentialsDto): Promise<AuthTokenDto> {
    return await firstValueFrom(this.accountService.signIn(creds));
  }

  @Public()
  @GrpcMethod()
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
    return await firstValueFrom(this.accountService.signUp(creds));
  }

  //Now this method used to test guard mechanism
  @GrpcMethod()
  @UseGuards(JwtAuthGuard)
  async verify(some, metadata: any): Promise<object> {
    return;
  }
  @GrpcMethod()
  @UseGuards(MyAuthGuard)
  async verifyMy(some, metadata: any): Promise<object> {
    return;
  }
}
