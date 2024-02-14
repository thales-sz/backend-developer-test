import { Job } from '../../src/domain/entity/job.entity';
import { JobStatus } from '../../src/domain/enum/job-status.enum';
import { makeFakeCompany } from './company.factory';

export function makeFakeJob(): Job {
  return new Job({
    id: '46278856-590c-4307-9bc0-2f4e2dc76065',
    company: makeFakeCompany(),
    description: 'Fake Job Description',
    location: 'Fake Job Location',
    notes: 'Fake Job Notes',
    status: JobStatus.DRAFT,
    title: 'Fake Job Title',
    updatedAt: new Date(),
    createdAt: new Date(),
  });
}
