import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as YAML from 'yaml';

import 'dotenv/config';
import { LoggingService } from './core/logging/logging.service';
import { CustomExceptionFilter } from './core/logging/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });
  const loggingService = new LoggingService();
  app.useGlobalFilters(new CustomExceptionFilter());

  process.on('uncaughtException', (error) => {
    loggingService.error(
      'Uncaught Exception:',
      error instanceof Error ? error.message : String(error),
    );
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error(
      'Unhandled Rejection at:',
      promise.toString(),
      'reason:',
      reason instanceof Error ? reason.message : reason.toString(),
    );
  });

  const doc = fs.readFile('doc/api.yaml', 'utf8');
  const swaggerDoc = YAML.parse(await doc);
  SwaggerModule.setup('doc', app, swaggerDoc);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
