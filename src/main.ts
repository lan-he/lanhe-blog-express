import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing
  app.use(logger);
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('nest');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('Nest zero to one')
    .setDescription('The nest API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
