import { Controller, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Hello } from './interfaces/hero.interface';

@Controller('hero')
export class HeroController {
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}
  @GrpcMethod('HeroService', 'GetHello')
  getHello(): Hello {
    console.log('hello123');
    return { message: 'Hello, world' };
  }
}
