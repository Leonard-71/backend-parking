import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');
/*
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      "http://localhost:5173",
      "http://localhost:5175",

    "https://fl-parcare.netlify.app", 
    "https://67541a25c6db14dc679a4f4e--fl-parcare.netlify.app"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
*/


app.enableCors({
  origin: [
    'https://6754b6e3d8f04f866fe76ea2--fl-parcare.netlify.app', // URL-ul Netlify
    'https://fl-parcare.netlify.app', // Domeniul final (dacă există)
    'http://localhost:5173', // Pentru dezvoltare locală
    'http://localhost:3000', // Pentru cereri locale
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false, 
});


  await app.listen(3000);
  logger.log('Application is running on http://localhost:3000');
}
bootstrap();
