import { User } from 'src/model/user/user.model';

declare global {
  declare namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
