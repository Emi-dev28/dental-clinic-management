import { Inject, Injectable } from '@nestjs/common';
import { PatientDTO } from '../dto/patient.dto';
import { UpdateResult } from 'typeorm';
import { IPatientService } from './IPatient.service';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PatientRepository } from '../../infrastructure/patient.repository';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { Patient } from '../../domain/patient.domain';

@Injectable()
export class PatientService implements IPatientService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: PatientRepository,
    private mapper: MapperService,
  ) {}

  async create(createPatientDto: PatientDTO): Promise<PatientDTO> {
    try {
      const patient = this.mapper.dtoToClass(createPatientDto, new Patient());
      const savedPatient = await this.patientRepository.create(patient);
      console.log(savedPatient);
      return this.mapper.entityToClass(savedPatient, new PatientDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      const patients = await this.patientRepository.findAll();
      return patients.map((patient) =>
        this.mapper.entityToClass(patient, new PatientDTO()),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number) {
    try {
      const patient = await this.patientRepository.findOne(id);
      return this.mapper.entityToClass(patient, new PatientDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<UpdateResult> {
    try {
      return this.patientRepository.update(id, updatePatientDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  remove(id: number) {
    return this.patientRepository.remove(id);
  }
}
