import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FetchCompaniesUseCase } from './fetch-companies.use-case';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
import { makeFakeCompany } from '../../../../test/factory/company.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '../../../domain/entity/company.entity';
import { repositoryMockFactory } from '../../../../test/factory/repositories/repository.factory';

describe('FetchCompaniesUseCase', () => {
  let fetchCompaniesUseCase: FetchCompaniesUseCase;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchCompaniesUseCase,
        {
          provide: getRepositoryToken(Company),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    fetchCompaniesUseCase = module.get<FetchCompaniesUseCase>(
      FetchCompaniesUseCase,
    );
    companyRepository = module.get(getRepositoryToken(Company));
  });

  it('should fetch companies successfully', async () => {
    const mockCompanies = [makeFakeCompany(), makeFakeCompany()];

    jest.spyOn(companyRepository, 'find').mockResolvedValue(mockCompanies);

    const companies = await fetchCompaniesUseCase.execute();

    expect(fetchCompaniesUseCase).toBeDefined();
    expect(companies).toEqual(mockCompanies);
  });

  it('should throw NotFoundException if no companies are found', async () => {
    jest.spyOn(companyRepository, 'find').mockResolvedValue([]);

    await expect(fetchCompaniesUseCase.execute()).rejects.toThrow(
      NotFoundException,
    );
  });
});
