import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT1 || 4000;

  const docConfig = new DocumentBuilder()
    .setTitle('Home Library Documentation')
    .setDescription('This is my first documentation for swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
