import { UpdateResult } from 'typeorm';
import { DentistDTO } from '../dto/create-dentist.dto';
import { UpdateDentistDto } from '../dto/update-dentist.dto';

export interface IDentistService {
  create(dentist: DentistDTO): Promise<DentistDTO>;
  findOne(id: number): Promise<DentistDTO>;
  remove(id: number): Promise<void>;
  findAll(): Promise<DentistDTO[]>;
  update(id: number, dentist: UpdateDentistDto): Promise<UpdateResult>;
}
