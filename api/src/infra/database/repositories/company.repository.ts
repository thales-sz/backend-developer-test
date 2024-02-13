import { Company } from 'src/domain/entity/company.entity';
import { EntityManager } from 'typeorm';

export class CompanyRepository {
  constructor(private readonly entityManager: EntityManager) {}
  async find(): Promise<Company[]> {
    return this.entityManager.query('SELECT * FROM companies');
  }

  async findById(id: string): Promise<Company> {
    return this.entityManager.query(`SELECT * FROM companies WHERE id = ${id}`);
  }
}
