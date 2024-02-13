import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('companies')
export class Company extends AbstractEntity<Company> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
