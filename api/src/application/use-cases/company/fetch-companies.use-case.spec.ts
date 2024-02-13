import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FetchCompaniesUseCase } from './fetch-companies.use-case';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
import { makeFakeCompany } from '../../../../test/factory/company.factory';

describe('FetchCompaniesUseCase', () => {
  let fetchCompaniesUseCase: FetchCompaniesUseCase;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchCompaniesUseCase,
        {
          provide: CompanyRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    fetchCompaniesUseCase = module.get<FetchCompaniesUseCase>(
      FetchCompaniesUseCase,
    );
    companyRepository = module.get<CompanyRepository>(CompanyRepository);
  });

  it('should fetch companies successfully', async () => {
    const mockCompanies = [makeFakeCompany(), makeFakeCompany()];

    jest.spyOn(companyRepository, 'find').mockResolvedValue(mockCompanies);

    const companies = await fetchCompaniesUseCase.execute();

    expect(fetchCompaniesUseCase).toBeDefined();
    expect(companies).toEqual(mockCompanies);
  });

  it('should throw NotFoundException if no companies are found', async () => {
    jest
      .spyOn(companyRepository, 'find')
      .mockRejectedValue(new NotFoundException());

    await expect(fetchCompaniesUseCase.execute()).rejects.toThrow(
      NotFoundException,
    );
  });
});
