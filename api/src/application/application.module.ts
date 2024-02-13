import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { DomainModule } from '../domain/domain.module';
import { JobController } from './controller/job.controller';
import { FetchCompaniesUseCase } from './use-cases/company/fetch-companies.use-case';
import { FetchCompanyByIdUseCase } from './use-cases/company/fetch-company-by-id.use-case';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [DomainModule, DatabaseModule],
  controllers: [CompanyController, JobController],
  providers: [FetchCompaniesUseCase, FetchCompanyByIdUseCase],
})
export class ApplicationModule {}
