import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { LoggingService } from '../logging/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly loggingService = new LoggingService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const responseObj = exception.getResponse();

      if (typeof responseObj === 'string') {
        message = responseObj;
      } else {
        message = responseObj['message'] || 'Unknown error';
      }
      status = exception.getStatus();
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.loggingService.error(
      message,
      `[CUSTOM EXCEPTION]: ${JSON.stringify(exception)}, Path: ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
