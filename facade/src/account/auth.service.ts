
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CLIENT_OPTS, MSERVICE_CONTROLLER } from './constants';
import { AuthResponseDto, AuthTokenDto, } from './dto/account-dto';
import { IAccountGrpcService } from './interface/account-grpc-interface';


@Injectable()
export class AuthService implements OnModuleInit{
  constructor(@Inject(CLIENT_OPTS) private client: ClientGrpc) {}
  private accountService: IAccountGrpcService;

  public onModuleInit(): void {
    this.accountService = this.client.getService<IAccountGrpcService>(MSERVICE_CONTROLLER);
  }

  public async validate(token: AuthTokenDto): Promise<AuthResponseDto> {
    return await firstValueFrom(this.accountService.verify(token));
  }
}