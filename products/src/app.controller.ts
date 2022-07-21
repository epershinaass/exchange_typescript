import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  data: number[];
}

interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class AppController {
  constructor(private mathService: ProductsService) { }

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(userId: number, metadata: any): ISumOfNumberArray {
    return { sum: this.mathService.accumulate(userId) };
  }
}
