import { ContactInfo } from '@/modules/contact-info/domain/contact-info.domain';
import { Appointment } from '@/modules/appointment/domain/appointment.domain';
import { Base } from '@common/domain/Base.domain';

export class Dentist extends Base {
  id: number;
  private registrationNumber: string;
  private name: string;
  private lastname: string;
  private dni: string;
  private contactInfo: ContactInfo;
  private appointments?: Appointment[];
}
