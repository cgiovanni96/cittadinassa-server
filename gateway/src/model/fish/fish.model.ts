import BaseModel from '../global/base.model';
import { UUID } from '../global/type';
import { FISH_TYPE, ROLES } from './fish.type';

export class Fish extends BaseModel {
  name: string;
  codename: string;
  description?: string;
  type: FISH_TYPE;
  extra: ExtraInfo;
  roles: FishToRole[];
  eventdIds: UUID[];
}

export class ExtraInfo {
  drive: string;
  discord: string;
}

export class FishToRole {
  fish: Fish;
  role: NetRole;
  userIds: UUID[];
}

export class NetRole {
  name: string;
  type: ROLES;
  fishes: FishToRole[];
}
