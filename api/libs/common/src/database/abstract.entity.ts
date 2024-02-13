import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity<T> {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
