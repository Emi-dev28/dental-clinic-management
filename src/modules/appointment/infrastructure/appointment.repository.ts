import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAppointmentRepository } from '../application/repository/IAppointment.repository';
import { AppointmentEntity } from './persistence/entities/appointment.entity';
import { Appointment } from '../domain/appointment.domain';
import { UpdateAppointmentDto } from '../application/dto/update-appointment.dto';
import { MapperService } from '@common/application/service/mapper/mapper.service';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private mapper: MapperService,
  ) {}
  // recibe una entidad de dominio  //  devuelve una de persistencia
  public async create(appointment: Appointment): Promise<AppointmentEntity> {
    try {
      const appointmentEntity = this.mapper.classToEntity(
        appointment,
        new AppointmentEntity(),
      );
      return await this.appointmentRepository.save(appointmentEntity);
    } catch (err) {
      throw new Error(err);
    }
  }
  async findAll(): Promise<AppointmentEntity[]> {
    try {
      return await this.appointmentRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number): Promise<AppointmentEntity> {
    try {
      const appointmentEntity = await this.appointmentRepository.findOne({
        where: { id: id },
        relations: { dentist: true, patient: true },
      });
      return appointmentEntity;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<UpdateResult> {
    try {
      const appointmenUpdated = await this.appointmentRepository.update(
        id,
        updateAppointmentDto,
      );
      if (appointmenUpdated.affected > 0) {
        return appointmenUpdated;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    try {
      await this.appointmentRepository.softDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
