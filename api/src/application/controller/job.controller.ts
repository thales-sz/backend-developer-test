import { Body, Controller, Post } from '@nestjs/common';
import { CreateJobUseCase } from '../use-cases/job/create-job.use-case';
import { CreateJobDto } from '../../domain/dto/create-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly createJobUseCase: CreateJobUseCase) {}

  @Post()
  async create(@Body() job: CreateJobDto) {
    console.log(job);
    return this.createJobUseCase.execute(job);
  }
  // @Get('/:job_id')
  // async fetchJobById(@Param() param: FetchJobDto) {
  //   return this.jobService.fetchJobById(param.job_id);
  // }
}
