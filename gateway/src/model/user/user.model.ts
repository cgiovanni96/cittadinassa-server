import BaseModel from '../global/base.model';

/* -------------------------------------------------------------------------- */
/*                                    MODEL                                   */
/* -------------------------------------------------------------------------- */

export class User extends BaseModel {
  name: string;
  email: string;
  profile: Profile;
  authInfo: AuthInfo;
}

export class Profile extends BaseModel {
  avatar?: string;
  globalRole: string;
}

export class AuthInfo extends BaseModel {
  confirmed: boolean;
  changingPassword: boolean;
}

export class Link extends BaseModel {}
