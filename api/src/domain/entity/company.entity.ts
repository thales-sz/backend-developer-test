import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class Company extends AbstractEntity<Company> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
