import { Company } from '../../src/domain/entity/company.entity';

export function makeFakeCompany(): Company {
  return new Company({
    id: '46278856-590c-4307-9bc0-2f4e2dc76065',
    name: 'Fake Company Name',
    updatedAt: new Date(),
    createdAt: new Date(),
  });
}
