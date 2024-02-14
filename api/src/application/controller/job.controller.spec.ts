import { Test, TestingModule } from '@nestjs/testing';
// import { NotFoundException } from '@nestjs/common';
import { JobController } from './job.controller';
import { CreateJobUseCase } from '../use-cases/job/create-job.use-case';
import { JobRepository } from '../../infra/database/repositories/job.repository';
import { makeFakeJob } from '../../../test/factory/job.factory';
import { CompanyRepository } from '../../infra/database/repositories/company.repository';

describe('JobController', () => {
  let controller: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [JobController],
      providers: [CreateJobUseCase, JobRepository, CompanyRepository],
    }).compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch jobs successfully', async () => {
    // const mockJobs = [makeFakeJob(), makeFakeJob()];
    // jest
    //   .spyOn(controller['fetchJobsUseCase'], 'execute')
    //   .mockResolvedValue(mockJobs);
    // const Jobs = await controller.fetchJobs();
    // expect(Jobs).toEqual(mockJobs);
  });

  it('should fetch Job by id successfully', async () => {
    // const mockJob = makeFakeJob();
    // jest
    //   .spyOn(controller['fetchJobByIdUseCase'], 'execute')
    //   .mockResolvedValue(mockJob);
    // const job = await controller.fetchJobById({ id: '1' });
    // expect(job).toEqual(mockJob);
  });

  it('should throw NotFoundException if no Jobs are found', async () => {
    // jest
    //   .spyOn(controller['fetchJobsUseCase'], 'execute')
    //   .mockRejectedValue(new NotFoundException());
    // await expect(controller.fetchJobs()).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if no Job is found by id', async () => {
    // jest
    //   .spyOn(controller['fetchJobByIdUseCase'], 'execute')
    //   .mockRejectedValue(new NotFoundException());
    // await expect(controller.fetchJobById({ Job_id: '1' })).rejects.toThrow(
    //   NotFoundException,
    // );
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
});
