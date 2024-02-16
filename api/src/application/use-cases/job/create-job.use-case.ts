import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
import { CreateJobDto } from '../../../domain/dto/create-job.dto';
import { Job } from '../../../domain/entity/job.entity';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
import { makeJob } from '../../../main/factory/job.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../../domain/entity/company.entity';
@Injectable()
export class CreateJobUseCase {
  protected logger: Logger = new Logger(CreateJobUseCase.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: JobRepository,
    @InjectRepository(Company)
    private readonly companyRepository: CompanyRepository,
  ) { }

  async execute(createJob: CreateJobDto): Promise<Job> {
    const { companyId, ...job } = createJob;

    const company = await this.companyRepository.findOneBy({ id: companyId });

    if (!company) {
      this.logger.warn('Company not found');
      throw new NotFoundException('Company not found');
    }

    const newJob = makeJob({ ...job, company });

    return this.jobRepository.save(newJob);
  }
}
