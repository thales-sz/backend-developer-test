import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Company } from '../../../domain/entity/company.entity';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';

@Injectable()
export class FetchCompaniesUseCase {
  protected logger: Logger = new Logger(FetchCompaniesUseCase.name);

  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<Company[]> {
    const company = await this.companyRepository.find();

    if (!company) {
      this.logger.error('No companies found');
      throw new NotFoundException('No companies found');
    }

    return company;
  }
}
