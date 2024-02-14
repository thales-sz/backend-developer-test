import { Injectable } from '@nestjs/common';
import { Company } from '../../../domain/entity/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyRepository extends Repository<Company> {}
