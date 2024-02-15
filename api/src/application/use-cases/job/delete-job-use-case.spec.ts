import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JobRepository } from '../../../infra/database/repositories/job.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../../../domain/entity/job.entity';
import { repositoryMockFactory } from '../../../../test/factory/repositories/repository.factory';
import { Company } from '../../../domain/entity/company.entity';
import { DeleteJobUseCase } from './delete-job.use-case';
import { makeFakeJob } from '../../../../test/factory/job.factory';
import { CreateJobUseCase } from './create-job.use-case';

describe('DeleteJobUseCase', () => {
  let deleteJobUseCase: DeleteJobUseCase;
  let jobRepository: JobRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteJobUseCase,
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

    deleteJobUseCase = module.get<DeleteJobUseCase>(DeleteJobUseCase);
    jobRepository = module.get(getRepositoryToken(Job));
  });

  it('should delete a Job successfully', async () => {
    const mockJob = makeFakeJob();
    jest.spyOn(jobRepository, 'findOneBy').mockResolvedValue(mockJob);
    jest.spyOn(jobRepository, 'delete').mockResolvedValue(undefined);

    const job = await deleteJobUseCase.execute('id');

    expect(DeleteJobUseCase).toBeDefined();
    expect(job).toEqual(undefined);
  });

  it('should throw NotFoundException if no Job is found when trying to delete a Job draft', async () => {
    jest.spyOn(jobRepository, 'findOneBy').mockResolvedValue(null);

    await expect(deleteJobUseCase.execute('invalid_id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
