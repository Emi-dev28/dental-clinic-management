import { AppointmentEntity } from '@/modules/appointment/infrastructure/persistence/entities/appointment.entity';
import { ContactInfoEntity } from '@/modules/contact-info/infrastructure/persistence/entities/contact-Info.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DentistDTO {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsOptional()
  contactInfo?: ContactInfoEntity;

  @IsOptional()
  appointments?: AppointmentEntity[];
}
