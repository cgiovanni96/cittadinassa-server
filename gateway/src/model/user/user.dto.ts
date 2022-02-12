import { Get as DefaultGet } from '../global/dto/get.dto';
import { Update as DefaultUpdate } from '../global/dto/update.dto';
import { UserModel } from './user.model';

export class Get extends DefaultGet {}
export class Search extends UserModel {}
export class Create extends UserModel {}
export class Delete extends DefaultGet {}
export class Update extends DefaultUpdate<UserModel> {}
export class Login {
  name: string;
  password: string;
}
