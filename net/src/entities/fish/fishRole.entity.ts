import { UUID } from 'src/types/base.types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from '../role.entity';
import { SilentBase } from '../silentBase';
import { Fish } from './fish.entity';

@Entity()
export class FishRole extends SilentBase {
  @ManyToOne(() => Fish, (fish) => fish.roles)
  fish: Fish;

  @ManyToOne(() => Role, (role) => role.fishes, { eager: true })
  role: Role;

  @Column({ type: 'simple-array', default: [] })
  userIds: UUID[];
}
