import { Get as DefaultGet } from '../global/dto/get.dto';
import { Update as DefaultUpdate } from '../global/dto/update.dto';
import { User } from './user.model';

export class Get extends DefaultGet {}
export class Search extends User {}
export class Create extends User {}
export class Delete extends DefaultGet {}
export class Update extends DefaultUpdate<User> {}
export class Login {
  name: string;
  password: string;
}
