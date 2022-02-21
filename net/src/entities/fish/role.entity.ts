import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../base';
import { Fish } from './fish.entity';
import { UUID } from '../../types/base.types';
import { ROLES } from '../../types/roles.types';

@Entity()
export class Role extends Base {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: ROLES })
  type: ROLES;

  @ManyToOne(() => Fish, (fish) => fish.roles)
  fish: Fish;

  @Column({ type: 'simple-array', default: [] })
  userIds: UUID[];
}
