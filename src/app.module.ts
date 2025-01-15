import { Module } from '@nestjs/common';
import { TrpcModule } from './modules';

@Module({
  imports: [TrpcModule],
})
export class AppModule {}
