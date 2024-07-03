import { AppointmentEntity } from '@/modules/appointment/infrastructure/persistence/entities/appointment.entity';
import { ContactInfoEntity } from '@/modules/contact-info/infrastructure/persistence/entities/contact-Info.entity';
import { BaseEntity } from '@common/infrastructure/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity()
export class DentistEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  registrationNumber: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column()
  dni: string;

  @ApiProperty({ type: () => ContactInfoEntity })
  @OneToOne(() => ContactInfoEntity, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  contactInfo?: ContactInfoEntity;

  @ApiProperty({ type: () => AppointmentEntity })
  @OneToMany(() => AppointmentEntity, (appointment) => appointment.dentist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  appointments?: AppointmentEntity[];
}
