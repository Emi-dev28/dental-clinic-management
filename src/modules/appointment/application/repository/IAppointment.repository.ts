import { UpdateResult } from 'typeorm';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentEntity } from '../../infrastructure/persistence/entities/appointment.entity';
import { Appointment } from '../../domain/appointment.domain';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<AppointmentEntity>;
  findOne(id: number): Promise<AppointmentEntity>;
  remove(id: number): Promise<void>;
  findAll(): Promise<AppointmentEntity[]>;
  update(id: number, appointment: UpdateAppointmentDto): Promise<UpdateResult>;
}
