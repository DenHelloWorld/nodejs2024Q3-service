import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class ErrorHandlerService implements OnModuleInit {
  constructor(private readonly loggingService: LoggingService) {}

  onModuleInit() {
    process.on('uncaughtException', (error) => {
      this.loggingService.fatal(
        'Uncaught exception occurred',
        'Global Error Handler',
        {
          error: error.stack,
        },
      );
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.loggingService.fatal(
        'Unhandled promise rejection',
        'Global Error Handler',
        {
          reason,
          promise,
        },
      );
    });
  }
}
