import { DentistEntity } from '@/modules/dentist/infrastructure/persistence/entities/dentist.entity';
import { PatientEntity } from '@/modules/patient/infrastructure/persistence/entities/patient.entity';
import { BaseEntity } from '@common/infrastructure/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ContactInfoEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phoneNumber: string;

  @ApiProperty({ type: () => PatientEntity })
  @OneToOne(() => PatientEntity, (patient) => patient.contactInfo)
  patient?: PatientEntity;

  @ApiProperty({ type: () => DentistEntity })
  @OneToOne(() => DentistEntity, (dentist) => dentist.contactInfo, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  dentist?: DentistEntity;
}
