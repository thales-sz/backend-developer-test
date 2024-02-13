import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';

@Module({
  providers: [CompanyService],
  exports: [CompanyService],
})
export class DomainModule {}
