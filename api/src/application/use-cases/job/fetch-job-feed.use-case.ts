import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '../../../domain/services/s3.service';
@Injectable()
export class FetchJobFeedUseCase {
  protected logger: Logger = new Logger(FetchJobFeedUseCase.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {}

  async execute(): Promise<void> {
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
}
