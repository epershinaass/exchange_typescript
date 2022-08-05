import { Body, Controller, OnModuleInit, UseFilters } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { firstValueFrom } from 'rxjs';
import { CredentialsDto, AuthTokenDto, MessageDto } from './dto/account-dto';
import { AnyExceptionFilter } from './error/grpc-exception-filter';
import { IAccountGrpcService } from './interface/account-grpc-interface';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'account',
    url: `${process.env.ACCOUNT_URL??'0.0.0.0'}:${process.env.ACCOUNT_PORT??'5002'}`,
    protoPath: join(__dirname, './proto/account-grpc.proto'),
  },
};

@Controller()
@UseFilters(AnyExceptionFilter)
export class AccountController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IAccountGrpcService;

  onModuleInit() {
    this.grpcService =
      this.client.getService<IAccountGrpcService>('AccountController');
  }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto): Promise<AuthTokenDto> {
      return await firstValueFrom(this.grpcService.signIn(creds))
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
      return await firstValueFrom(this.grpcService.signUp(creds))
  }

  @GrpcMethod('AccountController', 'Verify')
  async verify(@Body() auth: AuthTokenDto): Promise<MessageDto> {
      return await firstValueFrom(this.grpcService.verify(auth))
  }
}
