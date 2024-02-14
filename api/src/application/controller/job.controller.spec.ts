import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { CreateJobUseCase } from '../use-cases/job/create-job.use-case';
import { makeFakeJob } from '../../../test/factory/job.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../../domain/entity/job.entity';
import { repositoryMockFactory } from '../../../test/factory/repositories/repository.factory';
import { Company } from '../../domain/entity/company.entity';
import { UpdateJobUseCase } from '../use-cases/job/update-job.use-case';
import { DeleteJobUseCase } from '../use-cases/job/delete-job.use-case';
import { JobStatus } from '../../domain/enum/job-status.enum';

describe('JobController', () => {
  let controller: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [JobController],
      providers: [
        CreateJobUseCase,
        UpdateJobUseCase,
        DeleteJobUseCase,
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

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a Job successfully', async () => {
    const mockJob = makeFakeJob();

    const mockCreateJobDto = {
      ...mockJob,
      companyId: mockJob.company.id,
    };

    jest
      .spyOn(controller['createJobUseCase'], 'execute')
      .mockResolvedValue(mockJob);

    const job = await controller.create(mockCreateJobDto);

    expect(job).toEqual(mockJob);
  });

  it('should update a Job successfully', async () => {
    const mockJob = makeFakeJob();

    const mockCreateJobDto = {
      ...mockJob,
      companyId: mockJob.company.id,
    };

    jest
      .spyOn(controller['updateJobUseCase'], 'execute')
      .mockResolvedValue(mockJob);

    const job = await controller.update(
      { job_id: mockJob.id },
      mockCreateJobDto,
    );

    expect(job).toEqual(mockJob);
  });

  it('should update a Job to "PUBLISHED" successfully', async () => {
    const mockJob = makeFakeJob();

    jest
      .spyOn(controller['updateJobUseCase'], 'execute')
      .mockResolvedValue({ ...mockJob, status: JobStatus.PUBLISHED });

    const job = await controller.publish({ job_id: mockJob.id });

    expect(job.status).toEqual(JobStatus.PUBLISHED);
  });

  it('should update a Job to "ARCHIVED" successfully', async () => {
    const mockJob = makeFakeJob();

    jest
      .spyOn(controller['updateJobUseCase'], 'execute')
      .mockResolvedValue({ ...mockJob, status: JobStatus.ARCHIVED });

    const job = await controller.archive({ job_id: mockJob.id });

    expect(job.status).toEqual(JobStatus.ARCHIVED);
  });

  it('should delete a Job successfully', async () => {
    jest
      .spyOn(controller['deleteJobUseCase'], 'execute')
      .mockResolvedValue(undefined);

    const job = await controller.delete({ job_id: 'id' });

    expect(job).toEqual(undefined);
  });
});
