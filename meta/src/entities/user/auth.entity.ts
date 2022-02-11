import { Column, Entity } from 'typeorm';
import { Base } from '../base';

@Entity()
export class Auth extends Base {
  @Column({ nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @Column({ type: 'boolean', default: false })
  changingPassword: boolean;
}
