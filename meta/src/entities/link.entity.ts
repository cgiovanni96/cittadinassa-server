import { Column, Entity } from 'typeorm';

import { Base } from './base';
import { UUID } from 'src/types/base.types';
import { LINKTYPES } from '../types/link.types';

@Entity()
export class Link extends Base {
  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, unique: true })
  link: UUID;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;

  @Column({ type: 'enum', enum: LINKTYPES })
  type: LINKTYPES;
}
