import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Job } from './job.entity';

@Entity('companies')
export class Company extends AbstractEntity<Company> {
  @Column({ type: 'text', unique: true })
  name: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs?: Job[];
}
