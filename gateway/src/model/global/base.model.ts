import { UUID } from './type/uuid.type.ts';

export default class BaseModel {
  id: UUID;

  createdAt?: Date;
  updatedAt?: Date;
}

export type BaseKeys = keyof BaseModel;
