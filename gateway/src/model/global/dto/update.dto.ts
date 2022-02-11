import { BaseKeys } from '../base.model';
import { Get } from './get.dto';

export class Update<C> extends Get {
  payload: Partial<Omit<C, BaseKeys>>;
}
