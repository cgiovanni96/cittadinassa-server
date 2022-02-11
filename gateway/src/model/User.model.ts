import BaseModel from './global/base.model';
import { Get as DefaultGet } from './global/dto/get.dto';
import { Update as DefaultUpdate } from './global/dto/update.dto';
import { Responses } from './global/response';

/* -------------------------------------------------------------------------- */
/*                                    MODEL                                   */
/* -------------------------------------------------------------------------- */

class UserModel extends BaseModel {
  name: string;
  email: string;
}

/* -------------------------------------------------------------------------- */
/*                                     DTO                                    */
/* -------------------------------------------------------------------------- */

class Get extends DefaultGet {}
class Search extends UserModel {}
class Create extends UserModel {}
class Delete extends DefaultGet {}
class Update extends DefaultUpdate<UserModel> {}

const UserDto = { Get, Search, Create, Delete, Update };

/* -------------------------------------------------------------------------- */
/*                                  RESPONSE                                  */
/* -------------------------------------------------------------------------- */

class Found extends Responses.Found<{ user: UserModel }> {}
class Created extends Responses.Created<{ user: UserModel }> {}
class Updated extends Responses.Updated {}
class Deleted extends Responses.Deleted {}

const UserResponse = { Found, Created, Updated, Deleted };

/* -------------------------------------------------------------------------- */
/*                                  EXPORTS                                   */
/* -------------------------------------------------------------------------- */

export { UserModel, UserResponse, UserDto };
