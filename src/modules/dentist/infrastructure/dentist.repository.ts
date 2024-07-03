import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DentistEntity } from './persistence/entities/dentist.entity';
import { IDentistRepository } from '../application/repository/IDentist.repository';
import { Dentist } from '../domain/dentist.domain';
import { UpdateDentistDto } from '../application/dto/update-dentist.dto';
import { MapperService } from '@common/application/service/mapper/mapper.service';

export class DentistRepository implements IDentistRepository {
  constructor(
    @InjectRepository(DentistEntity)
    private readonly dentistRepository: Repository<DentistEntity>,
    private readonly mapper: MapperService,
  ) {}

  public async create(dentist: Dentist): Promise<DentistEntity> {
    try {
      const dentistEntity = this.mapper.classToEntity(
        dentist,
        new DentistEntity(),
      );
      return await this.dentistRepository.save(dentistEntity);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findOne(id: number): Promise<DentistEntity> {
    try {
      const dentistEntity = await this.dentistRepository.findOne({
        where: { id },
        relations: { appointments: true },
      });
      return dentistEntity;
    } catch (err) {
      throw new Error(err);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.dentistRepository.softDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findAll(): Promise<DentistEntity[]> {
    try {
      const dentist: DentistEntity[] = await this.dentistRepository.find();
      console.log(dentist);
      return dentist;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async update(
    id: number,
    updateDentistDto: UpdateDentistDto,
  ): Promise<UpdateResult> {
    try {
      const patientUpdated = await this.dentistRepository.update(
        id,
        updateDentistDto,
      );
      if (patientUpdated.affected > 0) {
        return patientUpdated;
      }
    } catch (err) {
      throw err;
    }
  }
}
