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
import { ConfigService } from '@nestjs/config';
const crypto = require('crypto');

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'account',
    url: `${'0.0.0.0'}:${'5002'}`, // TODO: pass configService here
    protoPath: join(__dirname, './proto/account-grpc.proto'),
  },
};

@Controller()
export class AccountController implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  @Client(microserviceOptions)
  private client: ClientGrpc;
  private grpcService: IAccountGrpcService;
  private salt: string = this.configService.get('ACC_PASSW_SALT');
  onModuleInit() {
    this.grpcService =
      this.client.getService<IAccountGrpcService>('AccountController');
  }

  @GrpcMethod('AccountController', 'SignIn')
  async signIn(@Body() creds: CredentialsDto): Promise<AuthMessageDto> {
    creds.password = crypto.pbkdf2Sync(creds.password, this.salt, 1, 64, 'sha512').toString();
    try {
      return await firstValueFrom(this.grpcService.signIn(creds))
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @GrpcMethod('AccountController', 'SignUp')
  async signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
    creds.password = crypto.pbkdf2Sync(creds.password, this.salt, 1, 64, 'sha512').toString();
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
