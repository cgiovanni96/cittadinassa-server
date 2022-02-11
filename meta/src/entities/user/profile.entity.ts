import { Column, Entity } from 'typeorm';
import { Base } from '../base';

@Entity()
export class Profile extends Base {
  @Column({ nullable: true })
  avatar: string;
}
