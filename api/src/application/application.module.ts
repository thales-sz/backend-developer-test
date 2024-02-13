import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [CompanyController],
})
export class ApplicationModule {}
