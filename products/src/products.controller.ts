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
      const isFrozen = await this.productsService.freezeProduct(
        orderRequestDto,
      );
      const message = isFrozen ? '' : "Don't have enough free product";
      this.client.emit('resources_frozen', {
        isFrozen,
        message,
        ...orderRequestDto,
      });
    }
  }

  @EventPattern('move_recources')
  handleTakeProducts() {
    console.log('take products');
    console.log('give products');
    this.client.emit('move_products', '');
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
