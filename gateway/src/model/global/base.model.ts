import { UUID } from './type/UUID';

export default class BaseModel {
  id: UUID;

  createdAt?: Date;
  updatedAt?: Date;
}

export type BaseKeys = keyof BaseModel;
