import { Address } from '@/modules/address/domain/address.domain';
import { Appointment } from '@/modules/appointment/domain/appointment.domain';
import { ContactInfo } from '@/modules/contact-info/domain/contact-info.domain';
import { Base } from '@common/domain/Base.domain';

export class Patient extends Base {
  name: string;
  lastname: string;
  dni: string;
  contactInfo?: ContactInfo;
  address?: Address;
  appointment?: Appointment[];
}
