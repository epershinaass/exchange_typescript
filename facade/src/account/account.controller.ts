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
export class AccountController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IAccountGrpcService;

  onModuleInit() {
    this.grpcService =
      this.client.getService<IAccountGrpcService>('AccountController');
  }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto): Promise<AuthMessageDto> {
    try {
      return await firstValueFrom(this.grpcService.signIn(creds))
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
    try {
      return await firstValueFrom(this.grpcService.signUp(creds))
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @GrpcMethod('AccountController', 'IsAuth')
  async isAuth(@Body() auth: AuthMessageDto): Promise<MessageDto> {
    try {
      return await firstValueFrom(this.grpcService.isAuth(auth))
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
