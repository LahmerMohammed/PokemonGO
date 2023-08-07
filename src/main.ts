import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import setupSwagger from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  setupSwagger(app);

  await app.listen(8080);
}
bootstrap();
