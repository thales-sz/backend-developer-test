import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateJobUseCase } from './update-job.use-case';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
import { makeFakeJob } from '../../../../test/factory/job.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../../../domain/entity/job.entity';
import { repositoryMockFactory } from '../../../../test/factory/repositories/repository.factory';
import { Company } from '../../../domain/entity/company.entity';

describe('UpdateJobUseCase', () => {
  let updateJobUseCase: UpdateJobUseCase;
  let jobRepository: JobRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateJobUseCase,
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

    updateJobUseCase = module.get<UpdateJobUseCase>(UpdateJobUseCase);
    jobRepository = module.get(getRepositoryToken(Job));
  });

  it('should update a Job successfully', async () => {
    const mockJob = makeFakeJob();

    jest.spyOn(jobRepository, 'save').mockResolvedValue(mockJob);
    jest.spyOn(jobRepository, 'findOneBy').mockResolvedValue(mockJob);

    const job = await updateJobUseCase.execute(mockJob);

    expect(UpdateJobUseCase).toBeDefined();
    expect(job).toEqual(mockJob);
  });

  it('should throw NotFoundException if no company is found when trying to update a Job draft', async () => {
    const mockJob = makeFakeJob();

    jest
      .spyOn(jobRepository, 'findOneBy')
      .mockRejectedValue(new NotFoundException());

    await expect(updateJobUseCase.execute(mockJob)).rejects.toThrow(
      NotFoundException,
    );
    expect(jobRepository.findOneBy).toHaveBeenCalledWith({ id: mockJob.id });
  });
});
