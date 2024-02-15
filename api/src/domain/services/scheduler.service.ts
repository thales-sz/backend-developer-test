import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { S3Service } from './s3.service';
import { JobRepository } from '../../infra/database/repositories/job.repository';
import { JobStatus } from '../enum/job-status.enum';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../entity/job.entity';

type JobFeed = {
  id: string;
  title: string;
  description: string;
  company: string;
  createdAt: Date;
};

@Injectable()
export class SchedulerService {
  protected readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: JobRepository,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async execute(): Promise<void> {
    this.logger.verbose('Uploading job feed to S3 bucket...');

    const publishedJobs = await this.jobRepository.find({
      where: { status: JobStatus.PUBLISHED },
      relations: ['company'],
    });

    if (!publishedJobs || publishedJobs.length === 0) {
      this.logger.warn('No published jobs found');
      throw new NotFoundException('No published jobs found');
    }

    const jobFeed: JobFeed[] = publishedJobs.map((job) => {
      return {
        id: job.id,
        title: job.title,
        description: job.description,
        company: job.company.name,
        createdAt: job.createdAt,
      };
    });

    await this.s3Service.uploadToS3(
      this.configService.getOrThrow('AWS_BUCKET_NAME'),
      'job-feed.json',
      jobFeed,
    );
  }
}
