import { Module } from '@nestjs/common';
import { DentistService } from './application/service/dentist.service';
import { DentistController } from './interface/controllers/dentist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistEntity } from './infrastructure/persistence/entities/dentist.entity';
import { DentistRepository } from './infrastructure/dentist.repository';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([DentistEntity]), CommonModule],
  controllers: [DentistController],
  providers: [
    DentistService,
    {
      provide: 'DENTIST_REPOSITORY',
      useClass: DentistRepository,
    },
  ],
  exports: [DentistService],
})
export class DentistModule {}
