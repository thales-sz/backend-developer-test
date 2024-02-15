import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateJobUseCase } from '../use-cases/job/create-job.use-case';
import { CreateJobDto } from '../../domain/dto/create-job.dto';
import { UpdateJobDto } from '../../domain/dto/update-job.dto';
import { FetchJobDto } from '../../domain/dto/fetch-job.dto';
import { UpdateJobUseCase } from '../use-cases/job/update-job.use-case';
import { JobStatus } from '../../domain/enum/job-status.enum';
import { DeleteJobUseCase } from '../use-cases/job/delete-job.use-case';
import { FetchJobFeedUseCase } from '../use-cases/job/fetch-job-feed.use-case';
import { CacheKey } from '@nestjs/cache-manager';

@Controller()
export class JobController {
  constructor(
    private readonly createJobUseCase: CreateJobUseCase,
    private readonly updateJobUseCase: UpdateJobUseCase,
    private readonly deleteJobUseCase: DeleteJobUseCase,
    private readonly fetchJobFeedUseCase: FetchJobFeedUseCase,
  ) {}

  @Post('/job')
  async create(@Body() job: CreateJobDto) {
    return this.createJobUseCase.execute(job);
  }

  @Put('/job/:job_id/publish')
  async publish(@Param() { job_id }: FetchJobDto) {
    return this.updateJobUseCase.execute({
      id: job_id,
      status: JobStatus.PUBLISHED,
    });
  }

  @Put('/job/:job_id/archive')
  async archive(@Param() { job_id }: FetchJobDto) {
    return this.updateJobUseCase.execute({
      id: job_id,
      status: JobStatus.ARCHIVED,
    });
  }

  @Put('/job/:job_id')
  async update(
    @Param() { job_id }: FetchJobDto,
    @Body() updateJob: UpdateJobDto,
  ) {
    return this.updateJobUseCase.execute({ id: job_id, ...updateJob });
  }

  @HttpCode(204)
  @Delete('/job/:job_id')
  async delete(@Param() { job_id }: FetchJobDto) {
    return this.deleteJobUseCase.execute(job_id);
  }

  @Get('/feed')
  @CacheKey('jobFeed')
  async fetchFeed() {
    return this.fetchJobFeedUseCase.execute();
  }
}
