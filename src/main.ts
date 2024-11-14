import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as YAML from 'yaml';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();

  // try {
  //   const doc = await fs.readFile('doc/api.yaml', 'utf8');
  //   const swaggerDoc = YAML.parse(doc);
  //   SwaggerModule.setup('doc', app, swaggerDoc);
  // } catch (error) {
  //   console.error('Ошибка при чтении или парсинге YAML файла Swagger:', error);
  // }

  try {
    await app.listen(process.env.PORT || 4000);
    console.log(`Server started on port ${process.env.PORT || 4000}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

bootstrap();
