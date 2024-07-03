import { PatientEntity } from '@/modules/patient/infrastructure/persistence/entities/patient.entity';
import { BaseEntity } from '@common/infrastructure/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class AddressEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  street: string;

  @ApiProperty()
  @Column()
  location: string;

  @ApiProperty()
  @Column()
  zipCode: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty({ type: () => PatientEntity })
  @OneToOne(() => PatientEntity, (patient) => patient.address)
  patient?: PatientEntity;
}
