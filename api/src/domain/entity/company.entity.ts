import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Job } from './job.entity';

@Entity('companies')
export class Company extends AbstractEntity<Company> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
}
