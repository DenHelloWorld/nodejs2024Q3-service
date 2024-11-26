import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Req, Res, NextFunc } from './middleware.models';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly loggingService = new LoggingService();

  use(req: Req, res: Res, next: NextFunc): void {
    const { method, originalUrl, query, body: requestBody } = req;

    this.loggingService.verbose(
      `[REQUEST] ${method} [url]:${originalUrl} - [query parameters]: ${JSON.stringify(
        query,
      )} [body]: ${JSON.stringify(requestBody)}`,
    );

    const originalSend = res.send.bind(res);
    let responseBody: unknown;

    res.send = <T>(body: T): Res => {
      responseBody = body;
      return originalSend(body);
    };

    res.on('finish', () => {
      this.loggingService.verbose(
        `[RESPONSE] ${method} ${originalUrl} - [status code]: ${res.statusCode}, [body]: ${responseBody}`,
      );
    });

    next();
  }
}
