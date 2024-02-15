import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { S3Service } from './services/s3.service';
import { SchedulerService } from './services/scheduler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entity/job.entity';
import { Company } from './entity/company.entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Job, Company])],
  providers: [S3Service, SchedulerService],
  exports: [S3Service, SchedulerService],
})
export class DomainModule {}
