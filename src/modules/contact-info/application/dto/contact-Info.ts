import { PatientEntity } from '@/modules/patient/infrastructure/persistence/entities/patient.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContactInfoDTO {
  @ApiProperty({
    description: 'id number',
  })
  id: number;
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'phone number',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({
    description: 'dni',
  })
  @IsString()
  @IsNotEmpty()
  dni: string;
  @ApiProperty({
    description: 'patient',
  })
  @IsNotEmpty()
  patient: PatientEntity;
}
