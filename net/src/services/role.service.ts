import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { ROLES } from 'src/types/roles.types';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly role: Repository<Role>,
    private readonly connection: Connection,
  ) {}

  async save(data: { role: Role }): Promise<void> {
    await this.connection.manager.getRepository(Role).save(data.role);
  }

  async getAll(): Promise<Role[]> {
    return this.role.find();
  }

  async getByType(data: { type: ROLES }): Promise<Role> {
    return this.role.findOneOrFail({ where: { type: data.type } });
  }
}
