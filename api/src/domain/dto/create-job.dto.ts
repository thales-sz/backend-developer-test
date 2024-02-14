import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JobStatus } from '../enum/job-status.enum';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  companyId: string;

  @IsEnum(JobStatus)
  @IsNotEmpty()
  status: JobStatus;
}
