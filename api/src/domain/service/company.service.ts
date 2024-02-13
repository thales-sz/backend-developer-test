import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CompanyService {
  protected logger: Logger = new Logger(CompanyService.name);

  constructor() {}

  async fetchCompanies() {
    return 'fetchCompanies';
  }
}
