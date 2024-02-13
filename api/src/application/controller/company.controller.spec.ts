import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { FetchCompaniesUseCase } from '../use-cases/company/fetch-companies.use-case';
import { FetchCompanyByIdUseCase } from '../use-cases/company/fetch-company-by-id.use-case';
import { CompanyRepository } from '../../infra/database/repositories/company.repository';
import { makeFakeCompany } from '../../../test/factory/company.factory';
import { NotFoundException } from '@nestjs/common';

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CompanyController],
      providers: [
        FetchCompaniesUseCase,
        FetchCompanyByIdUseCase,
        {
          provide: CompanyRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch companies successfully', async () => {
    const mockCompanies = [makeFakeCompany(), makeFakeCompany()];
    jest
      .spyOn(controller['fetchCompaniesUseCase'], 'execute')
      .mockResolvedValue(mockCompanies);

    const companies = await controller.fetchCompanies();

    expect(companies).toEqual(mockCompanies);
  });

  it('should fetch company by id successfully', async () => {
    const mockCompany = makeFakeCompany();
    jest
      .spyOn(controller['fetchCompanyByIdUseCase'], 'execute')
      .mockResolvedValue(mockCompany);

    const company = await controller.fetchCompanyById({ company_id: '1' });

    expect(company).toEqual(mockCompany);
  });

  it('should throw NotFoundException if no companies are found', async () => {
    jest
      .spyOn(controller['fetchCompaniesUseCase'], 'execute')
      .mockRejectedValue(new NotFoundException());

    await expect(controller.fetchCompanies()).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException if no company is found by id', async () => {
    jest
      .spyOn(controller['fetchCompanyByIdUseCase'], 'execute')
      .mockRejectedValue(new NotFoundException());

    await expect(
      controller.fetchCompanyById({ company_id: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
