import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventService } from 'src/services/event.service';
import { FishService } from 'src/services/fish.service';
import { GroupService } from 'src/services/group.service';
import { ProjectService } from 'src/services/project.service';
import * as MESSAGE from 'src/messages/fish.message';
import { PR } from 'src/response/type';
import { Fish } from 'src/entities/fish/fish.entity';
import { response } from 'src/response';
import { FISH_TYPE } from 'src/types/fish.type';
import { UUID } from 'src/types/base.types';

@Controller()
export class FishController {
  constructor(
    private readonly fish: FishService,
    private readonly event: EventService,
    private readonly group: GroupService,
    private readonly project: ProjectService,
  ) {}

  @MessagePattern(MESSAGE.GET_ALL)
  async getAll(data?: { type?: FISH_TYPE }): PR {
    let payload: Fish[] = [];

    if (!data || !data.type) payload = await this.fish.getAll();
    else payload = await this[data.type].getAll();

    const type = data && data.type ? `${data.type}s` : 'fishes';

    if (payload !== []) return response(MESSAGE.GET_ALL, HttpStatus.OK, { [type]: payload });
    return response(MESSAGE.GET_ALL, HttpStatus.BAD_REQUEST, undefined);
  }

  @MessagePattern(MESSAGE.GET)
  async get(data: { id: string; type?: FISH_TYPE }): PR {
    try {
      const fish: { data: Fish } = undefined;

      if (!data.type) fish.data = await this.fish.get({ id: data.id });
      else fish.data = await this[data.type].get({ id: data.id });

      const type = data.type ? data.type : 'fish';
      return response(MESSAGE.GET, HttpStatus.OK, { [type]: fish.data });
    } catch {
      return response(MESSAGE.GET, HttpStatus.BAD_REQUEST, undefined);
    }
  }

  @MessagePattern(MESSAGE.CREATE)
  async create(data: { fish: Fish }): PR {
    const fish = await this.fish.create(data);
    if (fish) return response(MESSAGE.CREATE, HttpStatus.OK, { fish });
    return response(MESSAGE.CREATE, HttpStatus.BAD_REQUEST, undefined);
  }

  @MessagePattern(MESSAGE.UPDATE)
  async update(data: { id: UUID; payload: Partial<Fish> }): PR {
    try {
      await this.fish.update(data);
      return response(MESSAGE.UPDATE, HttpStatus.OK, { updated: true });
    } catch {
      return response(MESSAGE.UPDATE, HttpStatus.BAD_REQUEST, { updated: false });
    }
  }

  @MessagePattern(MESSAGE.DELETE)
  async delete(data: { id: UUID }): PR {
    try {
      await this.fish.delete(data);
      return response(MESSAGE.UPDATE, HttpStatus.OK, { deleted: true });
    } catch {
      return response(MESSAGE.UPDATE, HttpStatus.BAD_REQUEST, { deleted: false });
    }
  }
}
