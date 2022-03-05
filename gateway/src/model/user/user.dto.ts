import { Get as DefaultGet } from '../global/dto/get.dto';
import { Update as DefaultUpdate } from '../global/dto/update.dto';
import { UUID } from '../global/type';
import { User } from './user.model';

export class Get extends DefaultGet {}
export class Search extends User {}

export class Delete extends DefaultGet {}
export class Update extends DefaultUpdate<User> {}
export class Create extends User {
  password: string;
}
export class Login {
  email: string;
  password: string;
}

export class Confirm {
  link: UUID;
}
