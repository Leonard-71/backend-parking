import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');
 
  app.enableCors({
    origin:[ 'http://localhost:3000', 'https://frontend-parking-b9lu-pr7v9sbgg-leonard-71s-projects.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
    credentials: true, 
  });

  await app.listen(3000);
  logger.log('Application is running on http://localhost:3000');
}
bootstrap();
