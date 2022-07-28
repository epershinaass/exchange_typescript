import { Body, Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { firstValueFrom, lastValueFrom, withLatestFrom } from 'rxjs';
import { CredentialsDto, AuthMessageDto, MessageDto } from './dto/account-dto';
import { IGrpcService } from './interface/account-grpc-interface';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'account',
    url: `${process.env.ACCOUNT_URL??'0.0.0.0'}:${process.env.ACCOUNT_PORT??'5002'}`,
    protoPath: join(__dirname, './proto/account-grpc.proto'),
  },
};

@Controller()
export class AccountController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService =
      this.client.getService<IGrpcService>('AccountController');
  }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto): Promise<AuthMessageDto> {
      return await firstValueFrom(this.grpcService.signIn(creds))
      .catch( e => {throw new RpcException(e)});
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
    return await lastValueFrom(this.grpcService.signUp(creds))
    .catch( e => {throw new RpcException(e)});
  }

  @GrpcMethod('AccountController', 'IsAuth')
  async isAuth(@Body() auth: AuthMessageDto): Promise<MessageDto> {
    return await lastValueFrom(this.grpcService.isAuth(auth))
    .catch( e => {throw new RpcException(e)});
  }
}
