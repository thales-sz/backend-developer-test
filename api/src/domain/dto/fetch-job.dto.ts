import { IsNotEmpty, IsUUID } from 'class-validator';

export class FetchJobDto {
  @IsUUID()
  @IsNotEmpty()
  job_id: string;
}
