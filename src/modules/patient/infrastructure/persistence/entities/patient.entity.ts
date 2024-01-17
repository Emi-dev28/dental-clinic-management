import { AddressEntity } from '@/modules/address/infrastructure/persistence/entities/address.entity';
import { AppointmentEntity } from '@/modules/appointment/infrastructure/persistence/entities/appointment.entity';
import { ContactInfoEntity } from '@/modules/contact-info/infrastructure/persistence/entities/contact-Info.entity';
import { BaseEntity } from '@common/infrastructure/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class PatientEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column()
  dni: string;

  @ApiProperty({ type: () => AddressEntity })
  @OneToOne(() => AddressEntity, (address) => address.patient, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  address?: AddressEntity;

  @ApiProperty({ type: () => AppointmentEntity })
  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  appointments?: AppointmentEntity[];

  @ApiProperty({ type: () => ContactInfoEntity })
  @OneToOne(() => ContactInfoEntity, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  contactInfo?: ContactInfoEntity;
}
