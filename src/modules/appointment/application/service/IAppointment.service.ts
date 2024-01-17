import { UpdateResult } from 'typeorm';
import { AppointmentDto } from '../dto/appointment-dto';

export interface IAppointmentService {
  create(appointment: AppointmentDto): Promise<AppointmentDto>;
  findOne(id: number): Promise<AppointmentDto>;
  remove(id: number): Promise<void>;
  findAll(): Promise<AppointmentDto[]>;
  update(id: number, appointment: AppointmentDto): Promise<UpdateResult>;
}
