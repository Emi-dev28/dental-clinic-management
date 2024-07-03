import { Module } from '@nestjs/common';
import { AppointmentService } from './application/service/Appointment.service';
import { AppointmentController } from './interface/controllers/Appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './infrastructure/appointment.repository';
import { AppointmentEntity } from './infrastructure/persistence/entities/appointment.entity';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]), CommonModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    {
      provide: 'APPOINTMENT_REPOSITORY',
      useClass: AppointmentRepository,
    },
  ],
  exports: [AppointmentService],
})
export class AppointmentModule {}
