import { Repository, UpdateResult } from 'typeorm';
import { IPatientRepository } from '../application/repository/patient.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../domain/patient.domain';
import { PatientEntity } from './persistence/entities/patient.entity';
import { UpdatePatientDto } from '../application/dto/update-patient.dto';
import { MapperService } from '@common/application/service/mapper/mapper.service';

export class PatientRepository implements IPatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    private mapper: MapperService,
  ) {}
  public async create(patient: Patient): Promise<PatientEntity> {
    try {
      const patientEntity = this.mapper.classToEntity(
        patient,
        new PatientEntity(),
      );
      return await this.patientRepository.save(patientEntity);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findOne(id: number): Promise<PatientEntity> {
    try {
      const patientEntity = await this.patientRepository.findOne({
        where: { id },
        relations: { address: true, contactInfo: true },
      });
      return patientEntity;
    } catch (err) {
      throw new Error(err);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.patientRepository.softDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findAll(): Promise<PatientEntity[]> {
    try {
      const patients: PatientEntity[] = await this.patientRepository.find();
      return patients;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<UpdateResult> {
    try {
      const patientUpdated = await this.patientRepository.update(
        id,
        updatePatientDto,
      );
      if (patientUpdated.affected > 0) {
        return patientUpdated;
      }
    } catch (err) {
      throw err;
    }
  }
}
