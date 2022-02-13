import { Column, Entity } from 'typeorm';

import { GLOBAL_ROLES } from '../../types/role.type';
import { Base } from '../base';

@Entity()
export class Profile extends Base {
  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: GLOBAL_ROLES, default: GLOBAL_ROLES.MEMBER })
  globalRole: GLOBAL_ROLES;
}
