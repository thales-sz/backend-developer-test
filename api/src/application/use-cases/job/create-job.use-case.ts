import { Injectable, Logger } from '@nestjs/common';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
import { CreateJobDto } from '../../../domain/dto/create-job.dto';
import { Job } from '../../../domain/entity/job.entity';
@Injectable()
export class CreateJobUseCase {
  protected logger: Logger = new Logger(CreateJobUseCase.name);

  constructor(private readonly jobRepository: JobRepository) {}

  async execute(createJob: CreateJobDto): Promise<Job> {
    return this.jobRepository.create(createJob);
  }
}
