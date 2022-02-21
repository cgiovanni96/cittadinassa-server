import { UUID } from 'src/types/base.types';
import { FISH_TYPE } from '../../types/fish.type';
import { Column, Entity, OneToMany, TableInheritance } from 'typeorm';
import { Base } from '../base';
import { Role } from './role.entity';
import { ExtraInfo } from './extra.fish';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Fish extends Base {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  codename: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: FISH_TYPE })
  type: FISH_TYPE;

  @Column(() => ExtraInfo)
  extra: ExtraInfo;

  @OneToMany(() => Role, (role) => role.fish)
  roles: Role[];

  @Column({ type: 'simple-array', default: [] })
  eventdIds: UUID[];
}
