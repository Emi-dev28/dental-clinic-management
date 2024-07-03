import { Dentist } from '@/modules/dentist/domain/dentist.domain';
import { Patient } from '@/modules/patient/domain/patient.domain';
import { Base } from '@common/domain/Base.domain';

export class Appointment extends Base {
  id: number;
  private patient?: Patient;
  private dentist?: Dentist;
  private dateTime?: Date;
}
