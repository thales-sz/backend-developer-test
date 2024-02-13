import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class DomainModule {}
