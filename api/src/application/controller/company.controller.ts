import { Controller, Get, Param } from '@nestjs/common';
import { FetchCompaniesUseCase } from '../use-cases/company/fetch-companies.use-case';
import { FetchCompanyByIdUseCase } from '../use-cases/company/fetch-company-by-id.use-case';
import { FetchCompanyDto } from '../../domain/dto/fetch-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly fetchCompaniesUseCase: FetchCompaniesUseCase,
    private readonly fetchCompanyByIdUseCase: FetchCompanyByIdUseCase,
  ) {}

  @Get()
  async fetchCompanies() {
    return this.fetchCompaniesUseCase.execute();
  }

  @Get('/:company_id')
  async fetchCompanyById(@Param() param: FetchCompanyDto) {
    return this.fetchCompanyByIdUseCase.execute(param.company_id);
  }
}
