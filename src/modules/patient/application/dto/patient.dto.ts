import { AddressEntity } from '@/modules/address/infrastructure/persistence/entities/address.entity';
import { AppointmentEntity } from '@/modules/appointment/infrastructure/persistence/entities/appointment.entity';
import { ContactInfoEntity } from '@/modules/contact-info/infrastructure/persistence/entities/contact-Info.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatientDTO {
  @ApiProperty({
    description: 'name of the patient',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'lastname of the patient',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'dni of the patient',
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({
    description: 'address data of the patient',
  })
  @IsOptional()
  address: AddressEntity;

  @ApiProperty({
    description: 'appointments of the patient',
  })
  @IsOptional()
  appointments?: AppointmentEntity[];

  @IsOptional()
  @ApiProperty({
    description: 'contact info of the patient',
  })
  @IsNotEmpty()
  contactInfo: ContactInfoEntity;
}
