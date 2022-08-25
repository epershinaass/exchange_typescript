import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ConfigModule } from '@nestjs/config';
import { Catalog, CatalogSchema } from './schemas/productsCollection.schema';

const db_path = () => {
  const user =
    process.env.DB_USER !== ''
      ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
      : '';
  return `mongodb://${user}${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot((console.log(db_path()), db_path())),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Catalog.name, schema: CatalogSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
