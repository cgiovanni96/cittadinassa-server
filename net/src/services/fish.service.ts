import { GroupedFishes } from './../types/grouped.type';
import { Fish } from 'src/entities/fish/fish.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UUID } from 'src/types/base.types';
import { Role } from 'src/entities/role.entity';
import { FishRole } from 'src/entities/fish/fishRole.entity';
import { FishDto } from 'src/dto/fish.dto';
import { FISH_TYPE } from 'src/types/fish.type';
import { Project } from 'src/entities/fish/children/project.entity';
import { Event } from 'src/entities/fish/children/event.entity';
import { Group } from 'src/entities/fish/children/group.entity';

@Injectable()
export class FishService {
  constructor(
    @InjectRepository(Fish) private readonly fish: Repository<Fish>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
    @InjectRepository(FishRole) private readonly fishRole: Repository<FishRole>,
    private readonly connection: Connection,
  ) {}

  async save(data: { fish: Fish }): Promise<Fish> {
    return this.connection.manager.save(data.fish);
  }

  async getAll(): Promise<GroupedFishes> {
    // grouping the fishes into their types
    const fishes = await this.fish.find({ relations: ['roles'] });

    const ret: GroupedFishes = {
      projects: [],
      groups: [],
      events: [],
    };

    fishes.forEach((fish) => {
      if (fish.type === FISH_TYPE.PROJECT) ret.projects.push(<Project>fish);
      else if (fish.type === FISH_TYPE.EVENT) ret.events.push(<Event>fish);
      else if (fish.type === FISH_TYPE.GROUP) ret.groups.push(<Group>fish);
    });

    return ret;
  }

  async get(data: { id: string }): Promise<Fish> {
    return this.fish.findOneOrFail({ id: data.id });
  }

  async create(data: { fish: FishDto }): Promise<Fish> {
    const fished = this.fish.create({ ...data.fish });
    return this.fish.save(fished);
  }

  async update(data: { id: UUID; payload: Partial<FishDto> }): Promise<Fish> {
    const fish = await this.fish.findOneOrFail({ id: data.id });
    return this.fish.save({ ...fish, ...data.payload });
  }

  async delete(data: { id: UUID }): Promise<void> {
    await this.fish.delete({ id: data.id });
  }

  async addRoles(data: { fish: Fish }): Promise<Fish> {
    const allRoles = await this.role.find();
    if (!allRoles) return;

    const fishRoles: FishRole[] = [];

    allRoles.forEach(async (role) => {
      const newFR = await this.fishRole.save({ fish: data.fish, role: role });
      fishRoles.push(newFR);
    });

    return this.fish.findOneOrFail({ id: data.fish.id }, { relations: ['roles'] });
  }
}
