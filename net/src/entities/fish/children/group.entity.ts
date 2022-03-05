import { ChildEntity, Column } from 'typeorm';
import { Fish } from '../fish.entity';

@ChildEntity()
export class Group extends Fish {
  @Column({ type: 'date', nullable: true })
  date: Date;
}
