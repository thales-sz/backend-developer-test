import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { DomainModule } from '../domain/domain.module';
import { JobController } from './controller/job.controller';
import { FetchCompaniesUseCase } from './use-cases/company/fetch-companies.use-case';
import { FetchCompanyByIdUseCase } from './use-cases/company/fetch-company-by-id.use-case';
import { CreateJobUseCase } from './use-cases/job/create-job.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../domain/entity/company.entity';
import { Job } from '../domain/entity/job.entity';
import { UpdateJobUseCase } from './use-cases/job/update-job.use-case';
import { DeleteJobUseCase } from './use-cases/job/delete-job.use-case';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DomainModule,
    TypeOrmModule.forFeature([Company, Job]),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: 60,
        max: 10,
        store: redisStore as unknown as CacheStore,
        socket: {
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: configService.getOrThrow<string>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CompanyController, JobController],
  providers: [
    FetchCompaniesUseCase,
    FetchCompanyByIdUseCase,
    CreateJobUseCase,
    UpdateJobUseCase,
    DeleteJobUseCase,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ApplicationModule {}
