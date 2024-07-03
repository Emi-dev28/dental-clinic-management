import { Base } from '@common/domain/Base.domain';

export class User extends Base {
  email: string;
  password: string;
  constructor() {
    super();
  }
}
