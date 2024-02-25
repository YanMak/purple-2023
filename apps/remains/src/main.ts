/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { json, urlencoded } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'remains';
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 Remains is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
