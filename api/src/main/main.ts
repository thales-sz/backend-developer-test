import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: INestApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(AppModule.name);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app
    .listen(configService.get('PORT'))
    .then(async () =>
      logger.log(
        `Server is running on PORT: ${await configService.get('PORT')}`,
      ),
    );
}
bootstrap();
