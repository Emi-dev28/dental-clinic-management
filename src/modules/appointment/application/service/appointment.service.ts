import { Inject, Injectable } from '@nestjs/common';
import { AppointmentDto } from '../dto/appointment-dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { UpdateResult } from 'typeorm';
import { IAppointmentService } from './IAppointment.service';
import { AppointmentRepository } from '../../infrastructure/appointment.repository';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { Appointment } from '../../domain/appointment.domain';

@Injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: AppointmentRepository,
    private readonly mapper: MapperService,
  ) {}

  public async create(appointment: AppointmentDto): Promise<AppointmentDto> {
    try {
      const newAppointment = this.mapper.dtoToClass(
        appointment,
        new Appointment(),
      );
      const createdAppointment =
        await this.appointmentRepository.create(newAppointment);
      return this.mapper.entityToClass(
        createdAppointment,
        new AppointmentDto(),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(): Promise<AppointmentDto[]> {
    try {
      const appointments = await this.appointmentRepository.findAll();
      return appointments.map((appointments) =>
        this.mapper.entityToClass(appointments, new AppointmentDto()),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number): Promise<AppointmentDto> {
    try {
      const appointment = await this.appointmentRepository.findOne(id);
      return this.mapper.entityToClass(appointment, new AppointmentDto());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<UpdateResult> {
    try {
      return await this.appointmentRepository.update(id, updateAppointmentDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    try {
      return await this.appointmentRepository.remove(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
