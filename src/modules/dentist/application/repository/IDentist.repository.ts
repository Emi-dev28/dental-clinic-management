import { UpdateResult } from 'typeorm';
import { UpdateDentistDto } from '../dto/update-dentist.dto';
import { DentistEntity } from '../../infrastructure/persistence/entities/dentist.entity';
import { Dentist } from '../../domain/dentist.domain';

export interface IDentistRepository {
  create(dentist: Dentist): Promise<DentistEntity>;
  findOne(id: number): Promise<DentistEntity>;
  remove(id: number): Promise<void>;
  findAll(): Promise<DentistEntity[]>;
  update(id: number, dentist: UpdateDentistDto): Promise<UpdateResult>;
}
