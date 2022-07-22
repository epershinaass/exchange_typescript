import {Controller} from '@nestjs/common';
import {ProductsService} from './products.service';
import {GrpcMethod} from '@nestjs/microservices';

interface ProductResponseArray {
    data: ProductResponse[];
}

export interface ProductResponse {
    product_id: number,
    name: string,
    quantity: number
}

@Controller()
export class AppController {
    constructor(private productsService: ProductsService) {
    }

    @GrpcMethod('ProductController', 'Accumulate')
    accumulate(userId: number): any {
        // return {sum: this.productsService.accumulate(userId)};
        return {items:[{product_id: 1000, name: "HI15", quantity: 1}]}
    };

}
