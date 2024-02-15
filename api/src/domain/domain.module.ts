import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { S3Service } from './services/s3.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [S3Service],
  exports: [S3Service],
})
export class DomainModule {}
