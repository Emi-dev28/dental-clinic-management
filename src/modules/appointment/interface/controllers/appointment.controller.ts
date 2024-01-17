import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentDto } from '../../application/dto/appointment-dto';
import { AppointmentService } from '../../application/service/Appointment.service';
import { UpdateAppointmentDto } from '../../application/dto/update-appointment.dto';

@Controller('appointment')
@ApiTags('Appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Post('/save')
  async create(@Body() appointment: AppointmentDto): Promise<AppointmentDto> {
    return await this.appointmentService.create(appointment);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
