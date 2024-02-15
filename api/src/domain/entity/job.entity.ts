import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Company } from './company.entity';
import { AbstractEntity } from './abstract.entity';
import { JobStatus } from '../enum/job-status.enum';

@Entity('jobs')
export class Job extends AbstractEntity<Job> {
  @ManyToOne(() => Company, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: Relation<Company>;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  location: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.DRAFT })
  status: JobStatus;
}
