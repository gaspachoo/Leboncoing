import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignore les champs non listés dans le DTO
      forbidNonWhitelisted: true, // renvoie une erreur si champ inconnu
      transform: true, // transforme les types (utile pour num_tel, id, etc.)
    }),
  );

  // serialization (pour que @Exclude fonctionne)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
