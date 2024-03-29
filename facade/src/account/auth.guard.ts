import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto, AuthTokenDto } from './dto/account-dto';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class MyAuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  constructor(private reflector: Reflector) {}
  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req: Request = ctx.switchToRpc().getData();
    const meta: Map<string, Array<string>> = ctx.switchToRpc().getContext()[
      'internalRepr'
    ];
    const authorization = await meta.get('authorization')[0];

    if (!authorization) {
      throw new RpcException({ code: 16, message: 'I am first' });
    }

    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new RpcException({ status: 16, message: 'I am second' });
    }
    const token = new AuthTokenDto(bearer[1]);

    const authResponse: AuthResponseDto = await this.service.validate(token);
    //If you need authorization, you most likely need Id
    req['userId'] = authResponse.sub;

    return true;
  }
}
