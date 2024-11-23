import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Req, Res, NextFunc } from './middleware.models';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly loggingService = new LoggingService();
  use(req: Req, res: Res, next: NextFunc) {
    const { method, originalUrl, query, body } = req;
    this.loggingService.verbose(
      `[REQUEST] ${method} [url]:${originalUrl} - [query parameters]: ${JSON.stringify(
        query,
      )} [body]: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      this.loggingService.verbose(
        `[RESPONSE] ${method} ${originalUrl} - [status code]: ${res.statusCode}`,
      );
    });

    next();
  }
}
