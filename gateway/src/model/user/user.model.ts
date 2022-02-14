import BaseModel from '../global/base.model';

/* -------------------------------------------------------------------------- */
/*                                    MODEL                                   */
/* -------------------------------------------------------------------------- */

export class User extends BaseModel {
  name: string;
  email: string;
  profile: Profile;
}

export class Profile extends BaseModel {
  avatar?: string;
  globalRole: string;
}

export class Link extends BaseModel {}
