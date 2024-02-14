import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobRepository } from './repositories/job.repository';
import { CompanyRepository } from './repositories/company.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        database: configService.get<string>('POSTGRES_DB'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        port: configService.get<number>('POSTGRES_PORT'),
        autoLoadEntities: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JobRepository, CompanyRepository],
  exports: [JobRepository, CompanyRepository],
})
export class DatabaseModule {}
