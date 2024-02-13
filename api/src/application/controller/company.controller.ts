import { Controller, Get, Param } from '@nestjs/common';
import { FetchCompanyDto } from 'src/domain/dto/fetch-company.dto';
import { CompanyService } from 'src/domain/service/company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async fetchCompanies() {
    return this.companyService.fetchCompanies();
  }

  @Get('/:company_id')
  async fetchCompanyById(@Param() param: FetchCompanyDto) {
    return this.companyService.fetchCompanyById(param.company_id);
  }
}
