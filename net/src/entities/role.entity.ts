import { Column, Entity, OneToMany } from 'typeorm';

import { ROLES } from '../types/roles.types';
import { FishRole } from './fish/fishRole.entity';
import { SilentBase } from './silentBase';

@Entity()
export class Role extends SilentBase {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.MEMBER })
  type: ROLES;

  @OneToMany(() => FishRole, (fishRole) => fishRole.role)
  fishes: FishRole[];
}
