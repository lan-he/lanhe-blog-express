import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.setGlobalPrefix('nest-zero-to-one');
  await app.listen(3000);
}
bootstrap();
