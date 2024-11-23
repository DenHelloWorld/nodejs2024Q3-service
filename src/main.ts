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
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggingService));
  app.useGlobalFilters(new CustomExceptionFilter());

  const doc = fs.readFile('doc/api.yaml', 'utf8');
  const swaggerDoc = YAML.parse(await doc);
  SwaggerModule.setup('doc', app, swaggerDoc);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
