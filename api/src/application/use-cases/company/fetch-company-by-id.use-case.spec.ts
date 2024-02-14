import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';
import { makeFakeCompany } from '../../../../test/factory/company.factory';
import { FetchCompanyByIdUseCase } from './fetch-company-by-id.use-case';

describe('FetchCompanyByIdUseCase', () => {
  let fetchCompanyByIdUseCase: FetchCompanyByIdUseCase;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchCompanyByIdUseCase,
        {
          provide: CompanyRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    fetchCompanyByIdUseCase = module.get<FetchCompanyByIdUseCase>(
      FetchCompanyByIdUseCase,
    );
    companyRepository = module.get<CompanyRepository>(CompanyRepository);
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
