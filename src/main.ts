import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("BASSM API")
    .setDescription("BASSM school management system API documentation")
    .setVersion("1.0")
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
      name: "Authorization",
      description: "Enter your JWT token in the format: Bearer token",
    }, 'Authorization')
    .build()

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
