import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
import { makeFakeCompany } from '../../../../test/factory/company.factory';
import { FetchCompanyByIdUseCase } from './fetch-company-by-id.use-case';
import { Company } from '../../../domain/entity/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../../test/factory/repositories/repository.factory';

describe('FetchCompanyByIdUseCase', () => {
  let fetchCompanyByIdUseCase: FetchCompanyByIdUseCase;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        FetchCompanyByIdUseCase,
        {
          provide: getRepositoryToken(Company),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    fetchCompanyByIdUseCase = module.get<FetchCompanyByIdUseCase>(
      FetchCompanyByIdUseCase,
    );
    companyRepository = module.get(getRepositoryToken(Company));
  });

  it('should fetch company by id successfully', async () => {
    const mockCompanies = makeFakeCompany();
    jest.spyOn(companyRepository, 'findOneBy').mockResolvedValue(mockCompanies);

    const companies = await fetchCompanyByIdUseCase.execute('1');

    expect(FetchCompanyByIdUseCase).toBeDefined();
    expect(companies).toEqual(mockCompanies);
  });

  it('should throw NotFoundException if no company is found by id', async () => {
    jest
      .spyOn(companyRepository, 'findOneBy')
      .mockRejectedValue(new NotFoundException());

    await expect(fetchCompanyByIdUseCase.execute('1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
