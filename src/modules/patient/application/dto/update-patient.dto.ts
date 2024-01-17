import { PartialType } from '@nestjs/swagger';
import { PatientDTO } from './patient.dto';

export class UpdatePatientDto extends PartialType(PatientDTO) {}
