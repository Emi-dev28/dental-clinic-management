import { UpdateResult } from 'typeorm';
import { PatientDTO } from '../dto/patient.dto';

export interface IPatientService {
  create(patient: PatientDTO): Promise<PatientDTO>;
  findOne(id: number): Promise<PatientDTO>;
  remove(id: number): Promise<void>;
  findAll(): Promise<PatientDTO[]>;
  update(id: number, patient: PatientDTO): Promise<UpdateResult>;
}
