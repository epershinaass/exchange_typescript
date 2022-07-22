import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloId } from './interfaces/helloId.interface';
import { HelloWithId } from './interfaces/helloWithId.interface';

@Controller('hello')
export class HelloController {
  @GrpcMethod('HelloService', 'GetHello')
  getHello({ id }: HelloId): HelloWithId {
    return { message: 'hello with ' + id };
  }
}
