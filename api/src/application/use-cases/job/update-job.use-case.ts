import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../../../domain/entity/job.entity';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
@Injectable()
export class UpdateJobUseCase {
  protected logger: Logger = new Logger(UpdateJobUseCase.name);

  constructor(
    @InjectRepository(Job) private readonly jobRepository: JobRepository,
  ) {}

  async execute(job: Partial<Job>): Promise<Job> {
    const oldJob = await this.jobRepository.findOneBy({ id: job.id });

    if (!oldJob) {
      this.logger.error(`Job with id ${job.id} not found`);
      throw new NotFoundException(`Job with id ${job.id} not found`);
    }

    await this.jobRepository.update(oldJob.id, job);

    return this.jobRepository.findOneBy({ id: job.id });
  }
}
