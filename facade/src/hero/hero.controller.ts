import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './interfaces/empty.interface';
import { Hello } from './interfaces/hero.interface';

interface HeroService {
  getHello(data: Empty): Observable<Hello>;
}

@Controller()
export class HeroController {
// implements OnModuleInit {
  
  // private heroService: HeroService;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  // onModuleInit() {
  //   this.heroService = this.client.getService<HeroService>('HeroService');
  // }

  @GrpcMethod('HeroService', 'GetHello')
  getHello(data: Empty): Hello {
    console.log("hello123")
    return { message: "Hello, world" };
  }
}
