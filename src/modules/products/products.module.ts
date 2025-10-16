import { Module } from '@nestjs/common';
import { ProductsRouter } from './products.router';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  providers: [ProductsRouter, ProductsService],
})
export class ProductsModule {}
