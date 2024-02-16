import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../../../domain/entity/job.entity';
import { JobRepository } from '../../../infra/database/repositories/job.repository';

@Injectable()
export class DeleteJobUseCase {
  protected logger: Logger = new Logger(DeleteJobUseCase.name);

  constructor(
    @InjectRepository(Job) private readonly jobRepository: JobRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      this.logger.warn(`Job with id ${id} not found`);
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    await this.jobRepository.delete({ id });
  }
}
