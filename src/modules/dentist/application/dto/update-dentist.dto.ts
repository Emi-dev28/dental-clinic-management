import { PartialType } from '@nestjs/swagger';
import { DentistDTO } from './create-dentist.dto';

export class UpdateDentistDto extends PartialType(DentistDTO) {}
