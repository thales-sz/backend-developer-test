import { Injectable } from '@nestjs/common';
import { Job } from '../../../domain/entity/job.entity';
import { EntityManager } from 'typeorm';
import { CreateJobDto } from '../../../domain/dto/create-job.dto';

@Injectable()
export class JobRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async find(): Promise<Job[] | []> {
    return this.entityManager.query('SELECT * FROM jobs');
  }

  async findById(id: string): Promise<Job> {
    const [job] = await this.entityManager.query(
      `SELECT * FROM jobs WHERE id = '${id}'`,
    );

    return job;
  }

  async create(job: CreateJobDto): Promise<Job> {
    const { title, description, company, location } = job;
    const [newJob] = await this.entityManager.query(
      `INSERT INTO jobs (title, description, company_id, location) VALUES ('${title}', '${description}', '${company.companyId}', '${location}') RETURNING *`,
    );

    return newJob;
  }
}
