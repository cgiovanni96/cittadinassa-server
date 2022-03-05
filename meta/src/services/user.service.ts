import { GLOBAL_ROLES } from 'src/types/role.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { User } from 'src/entities/user/user.entity';
import { Conditions, UUID } from 'src/types/base.types';
import { Auth } from 'src/entities/user/auth.entity';
import { UserRelations, UserRelationsKeys } from 'src/types/relationship.type';
import { Profile } from 'src/entities/user/profile.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Auth) private readonly auth: Repository<Auth>,
    @InjectRepository(Profile) private readonly profile: Repository<Profile>,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                   DEFAULT                                  */
  /* -------------------------------------------------------------------------- */

  async save(data: { user: User }): Promise<User> {
    return this.connection.manager.save(data.user);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GETTER                                   */
  /* -------------------------------------------------------------------------- */

  async getAll(data: { relations: UserRelationsKeys }): Promise<User[]> {
    return this.user.find({ relations: UserRelations[data.relations] });
  }

  async get(data: { relations: UserRelationsKeys; id: UUID }): Promise<User> {
    return this.user.findOneOrFail({ id: data.id }, { relations: UserRelations[data.relations] });
  }

  async find(data: { conditions: Conditions<User>; relations: UserRelationsKeys }): Promise<User> {
    return this.user.findOneOrFail({
      where: { ...data.conditions },
      relations: [...UserRelations[data.relations]],
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   SETTER                                   */
  /* -------------------------------------------------------------------------- */

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    const hashed = await hash(data.password, 12);
    const authInfo = await this.auth.save({
      password: hashed,
    });

    const profile = await this.profile.save({ globalRole: GLOBAL_ROLES.MEMBER });

    return this.user.save({
      name: data.name,
      email: data.email,
      authInfo: authInfo,
      profile: profile,
    });
  }

  async update(data: { conditions: Conditions<User>; data: Partial<User> }): Promise<void> {
    await this.user.update({ ...data.conditions }, { ...data.data });
  }

  async delete(data: { id: UUID }): Promise<void> {
    const del = await this.user.delete({ id: data.id });
    if (del.affected === 0) throw new Error();
  }

  /* -------------------------------------------------------------------------- */
  /*                                    EXTRA                                   */
  /* -------------------------------------------------------------------------- */

  async verifyPassword(user: User, password: string): Promise<boolean> {
    const compared = await compare(password, user.authInfo.password);
    return compared;
  }

  async confirm(data: { id: UUID }): Promise<User> {
    const user = await this.user.findOneOrFail({ id: data.id });
    const info = await this.auth.save({ ...user.authInfo, confirmed: true });

    return this.user.save({
      ...user,
      authInfo: info,
    });
  }

  async toggleChangingPassword(data: { id: UUID; passwordState: boolean }): Promise<void> {
    await this.user.update({ id: data.id }, { authInfo: { changingPassword: data.passwordState } });
  }
}
