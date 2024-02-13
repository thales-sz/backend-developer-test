import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from 'src/infra/database/repositories/company.repository';
import { Company } from '../entity/company.entity';

@Injectable()
export class CompanyService {
  protected logger: Logger = new Logger(CompanyService.name);

  constructor(private readonly companyRepository: CompanyRepository) {}

  async fetchCompanies(): Promise<Company[]> {
    const companies = await this.companyRepository.find();

    if (!companies) {
      this.logger.error('No companies found');
      throw new NotFoundException('No companies found');
    }

    return companies;
  }

  async fetchCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      this.logger.error(`Company with id ${id} not found`);
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return company;
  }
}
