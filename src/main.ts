import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as YAML from 'yaml';

import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc = fs.readFile('doc/api.yaml', 'utf8');
  const swaggerDoc = YAML.parse(await doc);
  SwaggerModule.setup('doc', app, swaggerDoc);

  await app.listen(process.env.PORT1 || 4000);
}
bootstrap();
