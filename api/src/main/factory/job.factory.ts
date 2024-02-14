import { Job } from '../../domain/entity/job.entity';

export function makeJob(job: Partial<Job>) {
  return new Job({
    ...job,
  });
}
