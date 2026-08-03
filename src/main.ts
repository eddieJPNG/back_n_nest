import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  await app.useGlobalPipes( new ValidationPipe({ whitelist: true }))


  const config = new DocumentBuilder()
    .setTitle('Back N\' Nest')
    .setDescription('Projeto para estudo de backend com NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

 
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port 3000`);
}
bootstrap();
