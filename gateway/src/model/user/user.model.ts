import BaseModel from '../global/base.model';
import { Responses } from '../global/response';

/* -------------------------------------------------------------------------- */
/*                                    MODEL                                   */
/* -------------------------------------------------------------------------- */

export class UserModel extends BaseModel {
  name: string;
  email: string;
  profile: Profile;
}

export class Profile extends BaseModel {
  avatar?: string;
  globalRole: string;
}

export class Link extends BaseModel {}
