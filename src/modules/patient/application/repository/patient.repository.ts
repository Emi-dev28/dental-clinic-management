import { UpdateResult } from 'typeorm';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PatientEntity } from '../../infrastructure/persistence/entities/patient.entity';
import { Patient } from '../../domain/patient.domain';

export interface IPatientRepository {
  create(patient: Patient): Promise<PatientEntity>;
  findOne(id: number): Promise<PatientEntity>;
  remove(id: number): void;
  findAll(): Promise<PatientEntity[]>;
  update(id: number, updatePatientDto: UpdatePatientDto): Promise<UpdateResult>;
}
