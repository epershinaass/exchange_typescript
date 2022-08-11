import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    ClientsModule.register([
      {
        name: 'PRODUCTS_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'products',
          url: `${process.env.PRODUCTS_URL}:${process.env.PRODUCTS_PORT}`,
          protoPath: join(__dirname, './proto/products.proto'),
        },
      }
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule { }
