import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Auth } from './auth.entity';
import { Base } from '../base';
import { Profile } from './profile.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Auth, { nullable: false, cascade: ['remove'] })
  @JoinColumn()
  authInfo: Auth;

  @OneToOne(() => Profile, { eager: true, nullable: true, cascade: ['remove'] })
  @JoinColumn()
  profile: Profile;
}
