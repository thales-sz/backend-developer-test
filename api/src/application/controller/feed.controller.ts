import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '../../domain/services/s3.service';
import { SchedulerService } from '../../domain/services/scheduler.service';
import { CacheKey } from '@nestjs/cache-manager';

@Controller()
export class FeedController {
  protected readonly logger = new Logger(FeedController.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
    private readonly schedulerService: SchedulerService,
  ) {}

  @Get('/feed')
  @CacheKey('jobFeed')
  async fetchFeed() {
    this.logger.log('Fetching job feed from S3 bucket...');

    const bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');

    const jobFeed = await this.s3Service.fetchFromS3(
      bucketName,
      'job-feed.json',
    );

    if (!jobFeed) {
      this.logger.error('Job feed not found');
      throw new NotFoundException('Job feed not found');
    }

    return jobFeed;
  }

  @Post('/feed')
  async uploadFeed() {
    return this.schedulerService.execute();
  }
}
