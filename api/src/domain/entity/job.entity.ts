import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { AbstractEntity } from './abstract.entity';

@Entity('jobs')
export class Job extends AbstractEntity<Job> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  company: Company;

  @Column()
  location: string;

  @Column()
  status: string;
}
