import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
import { CreateJobDto } from '../../../domain/dto/create-job.dto';
import { Job } from '../../../domain/entity/job.entity';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
@Injectable()
export class CreateJobUseCase {
  protected logger: Logger = new Logger(CreateJobUseCase.name);

  constructor(
    private readonly jobRepository: JobRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(createJob: CreateJobDto): Promise<Job> {
    const { companyId, ...job } = createJob;

    const company = await this.companyRepository.findOneBy({ id: companyId });

    if (!company) {
      this.logger.error('Company not found');
      throw new NotFoundException('Company not found');
    }

    const newJob = new Job({
      ...job,
      company,
    });

    return this.jobRepository.create(newJob);
  }
}
