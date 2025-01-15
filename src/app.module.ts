import { Module } from '@nestjs/common';
import { ProductsModule, TrpcModule } from './modules';

@Module({
  imports: [TrpcModule, ProductsModule],
})
export class AppModule {}
