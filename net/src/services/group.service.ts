import { Group } from 'src/entities/fish/children/group.fish';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UUID } from 'src/types/base.types';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly group: Repository<Group>,
    private readonly connection: Connection,
  ) {}

  async save(data: { group: Group }): Promise<Group> {
    return this.connection.manager.save(data.group);
  }

  async getAll(): Promise<Group[]> {
    return this.group.find();
  }

  async get(data: { id: string }): Promise<Group> {
    return this.group.findOneOrFail({ id: data.id });
  }

  async create(data: { group: Partial<Group> }): Promise<Group> {
    return this.group.save(data.group);
  }

  async update(data: { id: UUID; payload: Partial<Group> }): Promise<Group> {
    const group = await this.group.findOneOrFail({ id: data.id });
    return this.group.save({ ...group, ...data.payload });
  }

  async deleted(data: { id: UUID }): Promise<void> {
    await this.group.delete({ id: data.id });
  }
}
