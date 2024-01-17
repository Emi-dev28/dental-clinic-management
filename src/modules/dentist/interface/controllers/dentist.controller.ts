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
import { DentistService } from '../../application/service/dentist.service';
import { DentistDTO } from '../../application/dto/create-dentist.dto';
import { UpdateDentistDto } from '../../application/dto/update-dentist.dto';

@Controller('dentist')
@ApiTags('Dentists')
export class DentistController {
  constructor(private readonly dentistService: DentistService) {}

  @Post('save')
  create(@Body() createDentistDto: DentistDTO) {
    return this.dentistService.create(createDentistDto);
  }

  @Get()
  findAll() {
    return this.dentistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dentistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDentistDto: UpdateDentistDto,
  ) {
    return this.dentistService.update(id, updateDentistDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dentistService.remove(id);
  }
}
