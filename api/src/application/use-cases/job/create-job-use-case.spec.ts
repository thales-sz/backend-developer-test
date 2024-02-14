import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateJobUseCase } from './create-job.use-case';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
import { makeFakeJob } from '../../../../test/factory/job.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../../../domain/entity/job.entity';
import { repositoryMockFactory } from '../../../../test/factory/repositories/repository.factory';
import { Company } from '../../../domain/entity/company.entity';
import { CompanyRepository } from '../../../infra/database/repositories/company.repository';

describe('CreateJobUseCase', () => {
  let createJobUseCase: CreateJobUseCase;
  let jobRepository: JobRepository;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateJobUseCase,
        {
          provide: getRepositoryToken(Job),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Company),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    createJobUseCase = module.get<CreateJobUseCase>(CreateJobUseCase);
    jobRepository = module.get(getRepositoryToken(Job));
    companyRepository = module.get(getRepositoryToken(Company));
  });

  it('should create a new Job successfully', async () => {
    const mockJob = makeFakeJob();

    const mockCreateJobDto = {
      ...mockJob,
      companyId: mockJob.company.id,
    };

    jest.spyOn(jobRepository, 'save').mockResolvedValue(mockJob);
    jest
      .spyOn(companyRepository, 'findOneBy')
      .mockResolvedValue(mockJob.company);

    const job = await createJobUseCase.execute(mockCreateJobDto);

    expect(CreateJobUseCase).toBeDefined();
    expect(job).toEqual(mockJob);
  });

  it('should throw NotFoundException if no company is found when trying to create a Job draft', async () => {
    const mockJob = makeFakeJob();

    const mockCreateJobDto = {
      ...mockJob,
      companyId: 'invalid_company_id',
    };

    jest
      .spyOn(companyRepository, 'findOneBy')
      .mockRejectedValue(new NotFoundException());

    await expect(createJobUseCase.execute(mockCreateJobDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
