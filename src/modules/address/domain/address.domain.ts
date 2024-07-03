import { Base } from '../../../../src/common/domain/Base.domain';

export class Address extends Base {
  id: number;
  private street: string;
  private location: string;
  private zipCode: string;
  private state: string;
}
