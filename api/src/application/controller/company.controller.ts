import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from 'src/domain/service/company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async fetchCompanies() {
    return this.companyService.fetchCompanies();
  }

  @Get('/:company_id')
  async fetchCompanyById(@Param('company_id') companyId: string) {
    return `fetchCompanyById ${companyId}`;
  }
}
