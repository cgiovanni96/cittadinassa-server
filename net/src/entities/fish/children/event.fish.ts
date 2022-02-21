import { ChildEntity, Column } from 'typeorm';
import { Fish } from '../fish.entity';

@ChildEntity()
export class Event extends Fish {
  @Column({ type: 'date' })
  eventDate: Date;
}
