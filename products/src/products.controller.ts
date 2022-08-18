import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  Client,
  ClientKafka,
  EventPattern,
  GrpcMethod,
  RpcException,
} from '@nestjs/microservices';
import {
  IAddProductRequest,
  IGetProductsResponse,
  IUserId,
} from './interfaces/products.interfaces';
import { getGrpcError } from './errors/products.error';
import { status } from '@grpc/grpc-js';
import { KAFKA_CONFIG } from './config/kafka.config';
import { OrderRequestDto, OrderType } from './dto/order-request.dto';

const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Controller()
export class ProductsController {
  @Client(KAFKA_CONFIG)
  private client: ClientKafka;

  constructor(private productsService: ProductsService) {}

  @EventPattern('order_created')
  async handleOrderCreated(orderRequestDto: OrderRequestDto) {
    if (orderRequestDto.order.orderType === OrderType.SELL) {
      console.log('yes it is for sell');
      // const isFrozen = await this.balanceService.freezeSum(orderRequestDto);
      // const message = isFrozen ? '' : "Don't have enough free money";
      // this.client.emit('resources_frozen', {
      //   isFrozen,
      //   message,
      //   ...orderRequestDto,
      // });
      /*
       .subscribe(() => {
        console.log('balance frozen with: ' + JSON.stringify(data));
       });
      */
    }
  }

  @GrpcMethod('ProductsController', 'AddProduct')
  async addProduct(addProductRequest: IAddProductRequest): Promise<object> {
    if (!checkForObjectId.test(String(addProductRequest.userId))) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    try {
      const isAdded = await this.productsService.addProduct(addProductRequest);
      if (isAdded) {
        return { status: 0 };
      }
      return { status: 2 };
    } catch (e) {
      throw new RpcException(getGrpcError(e));
    }
  }

  @GrpcMethod('ProductsController', 'GetProducts')
  async getProducts(userId: IUserId): Promise<IGetProductsResponse> {
    if (!checkForObjectId.test(userId.userId)) {
      throw new RpcException(getGrpcError(status.INVALID_ARGUMENT));
    }
    const userProducts = await this.productsService.getProducts(userId);
    return { products: userProducts.products };
  }
}
