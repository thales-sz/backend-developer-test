import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Company } from '../../../domain/entity/company.entity';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FetchCompanyByIdUseCase {
  protected logger: Logger = new Logger(FetchCompanyByIdUseCase.name);

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: CompanyRepository,
  ) { }

  async execute(id: string): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      this.logger.warn(`Company with id ${id} not found`);
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return company;
  }
}
