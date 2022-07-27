import { Body, Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientOptions,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { CredentialsDto, AuthMessageDto, MessageDto } from './dto/account-dto';
import { IGrpcService } from './interface/account-grpc-interface';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'account',
    protoPath: join(__dirname, './proto/account.proto'),
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
  signIn(@Body() creds: CredentialsDto): Promise<AuthMessageDto> {
    return this.grpcService.signIn(creds);
  }

  @GrpcMethod('AccountController', 'SignUp')
  signUp(@Body() creds: CredentialsDto): Promise<MessageDto> {
    return this.grpcService.signUp(creds);
  }

  @GrpcMethod('AccountController', 'IsAuth')
  isAuth(@Body() auth: AuthMessageDto): Promise<MessageDto> {
    return this.grpcService.isAuth(auth);
  }
}
