import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { User } from 'src/entities/user/user.entity';
import { Conditions, UUID } from 'src/types/base.types';
import { Auth } from 'src/entities/user/auth.entity';
import { UserRelations, UserRelationsKeys } from 'src/types/relationship.type';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Auth) private readonly auth: Repository<Auth>,
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

    return this.user.save({
      name: data.name,
      email: data.email,
      authInfo: authInfo,
    });
  }

  async update(data: { conditions: Conditions<User>; data: Partial<User> }): Promise<void> {
    await this.user.update({ ...data.conditions }, { ...data.data });
  }

  async delete(data: { id: UUID }): Promise<void> {
    await this.user.delete({ id: data.id });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    EXTRA                                   */
  /* -------------------------------------------------------------------------- */

  async verifyPassword(user: User, password: string): Promise<boolean> {
    const compared = await compare(password, user.authInfo.password);
    return compared;
  }

  async confirm(data: { id: UUID }): Promise<void> {
    await this.user.update({ id: data.id }, { authInfo: { confirmed: true } });
  }

  async toggleChangingPassword(data: { id: UUID; passwordState: boolean }): Promise<void> {
    await this.user.update({ id: data.id }, { authInfo: { changingPassword: data.passwordState } });
  }
}
