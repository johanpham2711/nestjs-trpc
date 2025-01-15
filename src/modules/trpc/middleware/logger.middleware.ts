import { Injectable, Logger } from '@nestjs/common';
import { MiddlewareOptions, TRPCMiddleware } from 'nestjs-trpc';

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  async use(opts: MiddlewareOptions) {
    const start = Date.now();
    const { next, path, type } = opts;

    const result = await next();
    const meta = {
      path,
      type,
      durationMs: Date.now() - start,
    };

    if (result.ok) {
      this.logger.log('Success', meta);
    } else {
      this.logger.error('Error', meta);
    }

    return result;
  }
}
