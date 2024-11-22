import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly loggingService = new LoggingService();
  use(req: Request, res: Response, next: NextFunction) {
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
