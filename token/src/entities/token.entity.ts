import { Column, Entity } from 'typeorm';
import { Base } from './base';

@Entity()
export class Token extends Base {
  @Column()
  userId: string;

  @Column()
  token: string;
}
