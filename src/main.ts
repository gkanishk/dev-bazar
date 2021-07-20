import { NestFactory, } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './httpExceptionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Dev Bazar API')
    .setDescription('Dev Bazar Frontend API V1')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(parseInt(process.env.PORT) ||3000);
}
bootstrap();
