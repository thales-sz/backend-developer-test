import { Injectable } from '@nestjs/common';
import { Job } from '../../../domain/entity/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobRepository extends Repository<Job> {}
