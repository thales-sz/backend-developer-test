import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';

async function bootstrap() {
  const app: INestApplication = (
    await NestFactory.create<NestExpressApplication>(AppModule)
  ).setGlobalPrefix('api/v1');
  const logger = new Logger(AppModule.name);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  });

  app.use(compression());

  await app.listen(configService.get('PORT'));

  logger.log(`Server is running on PORT: ${await configService.get('PORT')}`);
}
bootstrap();