import { Module } from '@nestjs/common';
import { PatientService } from './application/service/patient.service';
import { PatientController } from './interface/controllers/patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './infrastructure/persistence/entities/patient.entity';
import { PatientRepository } from './infrastructure/patient.repository';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity]), CommonModule],
  controllers: [PatientController],
  providers: [
    PatientService,
    {
      provide: 'PATIENT_REPOSITORY',
      useClass: PatientRepository,
    },
  ],
  exports: [PatientService],
})
export class PatientModule {}
