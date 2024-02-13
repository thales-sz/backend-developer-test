import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ApplicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
