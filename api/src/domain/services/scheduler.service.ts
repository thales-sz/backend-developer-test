import { Injectable, Logger } from '@nestjs/common';
import { S3Service } from './s3.service';
import { JobRepository } from '../../infra/database/repositories/job.repository';
import { JobStatus } from '../enum/job-status.enum';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  protected readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly jobRepository: JobRepository,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Cron('*/5 * * * *')
  async handleCron(): Promise<void> {
    this.logger.verbose('Uploading job feed to S3 bucket...');
    const publishedJobs = this.jobRepository.find({
      where: { status: JobStatus.PUBLISHED },
    });

    await this.s3Service.uploadToS3(
      this.configService.getOrThrow('AWS_BUCKET_NAME'),
      'job-feed.json',
      publishedJobs,
    );
  }
}
