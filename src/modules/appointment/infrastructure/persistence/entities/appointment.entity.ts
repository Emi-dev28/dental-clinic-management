import { DentistEntity } from '@/modules/dentist/infrastructure/persistence/entities/dentist.entity';
import { PatientEntity } from '@/modules/patient/infrastructure/persistence/entities/patient.entity';
import { BaseEntity } from '@common/infrastructure/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
@Entity()
export class AppointmentEntity extends BaseEntity {
  @ManyToOne(() => PatientEntity, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  patient?: PatientEntity[];

  @ApiProperty({ type: () => DentistEntity })
  @ManyToOne(() => DentistEntity, (dentist) => dentist.appointments, {
    cascade: true,
    nullable: true,
  })
  dentist?: DentistEntity;

  @ApiProperty()
  @Column()
  dateTime: Date;
}
