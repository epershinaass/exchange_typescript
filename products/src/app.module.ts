import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductsService],
})
export class AppModule { }
