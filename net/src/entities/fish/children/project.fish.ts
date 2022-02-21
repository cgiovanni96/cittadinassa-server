import { ChildEntity, Column } from 'typeorm';
import { Fish } from '../fish.entity';

@ChildEntity()
export class Project extends Fish {
  @Column({ type: 'date', nullable: true })
  startDate: Date;
}
