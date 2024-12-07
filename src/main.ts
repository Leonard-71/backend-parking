import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://frontend-parking-b9lu-pr7v9sbgg-leonard-71s-projects.vercel.app',
      "http://localhost:5173",
      "https://fl-parcare.netlify.app",
      "https://67541a25c6db14dc679a4f4e--fl-parcare.netlify.app/",
    "http://localhost:5175"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  logger.log('Application is running on http://localhost:3000');
}
bootstrap();
