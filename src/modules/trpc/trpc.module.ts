import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TrpcPanelController } from './trpc-panel.controller';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: 'src/modules/trpc/@generated',
    }),
  ],
  controllers: [TrpcPanelController],
  providers: [LoggerMiddleware],
})
export class TrpcModule {}
