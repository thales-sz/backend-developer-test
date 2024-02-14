import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateJobUseCase } from '../use-cases/job/create-job.use-case';
import { CreateJobDto } from '../../domain/dto/create-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly createJobUseCase: CreateJobUseCase) {}

  @Post()
  async create(@Body() job: CreateJobDto) {
    return this.createJobUseCase.execute(job);
  }

  @Put('/:job_id/publish')
  async publish(@Param() job: UpdateJobDto) {}

  @Put('/:job_id')
  async update(@Param() job: UpdateJobDto, @Body() updateJob: UpdateJobDto) {}
}
