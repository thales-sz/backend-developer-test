import { PickType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PickType(CreateJobDto, [
  'location',
  'title',
  'description',
]) {}
