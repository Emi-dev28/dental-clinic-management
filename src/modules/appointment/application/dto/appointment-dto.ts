import { DentistEntity } from '@/modules/dentist/infrastructure/persistence/entities/dentist.entity';
import { PatientEntity } from '@/modules/patient/infrastructure/persistence/entities/patient.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AppointmentDto {
  @IsOptional()
  patient: PatientEntity[];

  @ApiProperty({
    description: 'Dentist assigned to the appointment',
  })
  @IsOptional()
  dentist: DentistEntity;

  @ApiProperty({
    description: 'Date of the appointment',
  })
  @IsNotEmpty()
  dateTime: Date;
}
