import { GLOBAL_ROLES } from 'src/types/role.type';
import { Column, Entity } from 'typeorm';
import { Base } from '../base';

@Entity()
export class Profile extends Base {
  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: GLOBAL_ROLES, default: GLOBAL_ROLES.MEMBER })
  globalRole: GLOBAL_ROLES;
}
