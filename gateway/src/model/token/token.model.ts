import BaseModel from '../global/base.model';
import { UUID } from '../global/type';

export class Token extends BaseModel {
  userId: UUID;
  token: string;
}
