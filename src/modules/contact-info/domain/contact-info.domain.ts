import { Base } from '@common/domain/Base.domain';

export class ContactInfo extends Base {
  id: number;
  private email: string;
  private phoneNumber: string;
}
