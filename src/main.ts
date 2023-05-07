import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { migrate } from './migrations/migration-function';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const condfigService = app.get(ConfigService);
  const port = condfigService.get<number>('PORT') || 3030;
  app.useGlobalPipes(new ValidationPipe());

  await migrate();
  await app.listen(port);
}
bootstrap();
