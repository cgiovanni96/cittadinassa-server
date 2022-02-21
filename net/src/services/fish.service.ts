import { Fish } from 'src/entities/fish/fish.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UUID } from 'src/types/base.types';

@Injectable()
export class FishService {
  constructor(
    @InjectRepository(Fish) private readonly fish: Repository<Fish>,
    private readonly connection: Connection,
  ) {}

  async save(data: { fish: Fish }): Promise<Fish> {
    return this.connection.manager.save(data.fish);
  }

  async getAll(): Promise<Fish[]> {
    // grouping the fishes into their types
    return this.connection
      .getRepository(Fish)
      .createQueryBuilder('fish')
      .groupBy('fish.type')
      .getMany();
  }

  async get(data: { id: string }): Promise<Fish> {
    return this.fish.findOneOrFail({ id: data.id });
  }

  async create(data: { fish: Partial<Fish> }): Promise<Fish> {
    return this.fish.save(data.fish);
  }

  async update(data: { id: UUID; payload: Partial<Fish> }): Promise<Fish> {
    const fish = await this.fish.findOneOrFail({ id: data.id });
    return this.fish.save({ ...fish, ...data.payload });
  }

  async delete(data: { id: UUID }): Promise<void> {
    await this.fish.delete({ id: data.id });
  }
}
