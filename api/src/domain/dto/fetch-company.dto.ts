import { IsUUID, IsNotEmpty } from 'class-validator';

export class FetchCompanyDto {
  @IsUUID()
  @IsNotEmpty()
  company_id: string;
}
