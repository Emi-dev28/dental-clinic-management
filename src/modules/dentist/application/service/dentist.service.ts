import { Inject, Injectable } from '@nestjs/common';
import { DentistDTO } from '../dto/create-dentist.dto';
import { UpdateDentistDto } from '../dto/update-dentist.dto';
import { UpdateResult } from 'typeorm';
import { IDentistService } from './IDentist.service';
import { DentistRepository } from '../../infrastructure/dentist.repository';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { Dentist } from '../../domain/dentist.domain';

@Injectable()
export class DentistService implements IDentistService {
  constructor(
    @Inject('DENTIST_REPOSITORY')
    private readonly dentistRepository: DentistRepository,
    private readonly mapper: MapperService,
  ) {}
  async create(dentistDto: DentistDTO) {
    try {
      const newDentist = this.mapper.dtoToClass(dentistDto, new Dentist());
      const savedDentist = await this.dentistRepository.create(newDentist);
      return this.mapper.entityToClass(savedDentist, new DentistDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAll() {
    try {
      const dentists = await this.dentistRepository.findAll();
      return dentists.map((dentist) =>
        this.mapper.entityToClass(dentist, new DentistDTO()),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number): Promise<DentistDTO> {
    try {
      const dentist = await this.dentistRepository.findOne(id);
      return this.mapper.entityToClass(dentist, new DentistDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    id: number,
    updateDentistDto: UpdateDentistDto,
  ): Promise<UpdateResult> {
    try {
      return this.dentistRepository.update(id, updateDentistDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async remove(id: number) {
    try {
      this.dentistRepository.remove(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
