import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { DomainModule } from '../domain/domain.module';
import { JobController } from './controller/job.controller';
import { FetchCompaniesUseCase } from './use-cases/company/fetch-companies.use-case';
import { FetchCompanyByIdUseCase } from './use-cases/company/fetch-company-by-id.use-case';
import { DatabaseModule } from '../infra/database/database.module';
import { CreateJobUseCase } from './use-cases/job/create-job.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../domain/entity/company.entity';
import { Job } from '../domain/entity/job.entity';

@Module({
  imports: [
    DomainModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Company, Job]),
  ],
  controllers: [CompanyController, JobController],
  providers: [FetchCompaniesUseCase, FetchCompanyByIdUseCase, CreateJobUseCase],
})
export class ApplicationModule {}
