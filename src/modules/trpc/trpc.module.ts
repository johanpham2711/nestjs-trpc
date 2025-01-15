import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: 'src/modules/trpc/@generated',
    }),
  ],
})
export class TrpcModule {}
