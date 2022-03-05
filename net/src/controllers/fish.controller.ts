import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
import { RoleService } from 'src/services/role.service';
import { FishDto } from 'src/dto/fish.dto';

@Controller()
export class FishController {
  constructor(
    private readonly fish: FishService,
    private readonly event: EventService,
    private readonly group: GroupService,
    private readonly project: ProjectService,
    private readonly role: RoleService,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(MESSAGE.GET_ALL)
  async getAll(): PR {
    const fishes = await this.fish.getAll();
    return response(MESSAGE.GET_ALL, HttpStatus.OK, { fishes });
  }

  @MessagePattern(MESSAGE.GET_ALL_BY_TYPE)
  async getAllByType(@Payload() data: { type: FISH_TYPE }): PR {
    const payload = await this[data.type].getAll();
    const type = `${data.type}s`;

    if (payload !== [])
      return response(MESSAGE.GET_ALL_BY_TYPE, HttpStatus.OK, { [type]: payload });
  }

  @MessagePattern(MESSAGE.GET)
  async get(@Payload() data: { id: string; type?: FISH_TYPE }): PR {
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
  async create(@Payload() data: FishDto): PR {
    const fish = await this.fish.create({ fish: { ...data } });
    if (!fish) return response(MESSAGE.CREATE, HttpStatus.BAD_REQUEST, undefined);

    const fishWithRoles = await this.fish.addRoles({ fish });

    return response(MESSAGE.CREATE, HttpStatus.OK, { fish: fishWithRoles });
  }

  @MessagePattern(MESSAGE.UPDATE)
  async update(@Payload() data: { id: UUID; payload: Partial<FishDto> }): PR {
    try {
      await this.fish.update(data);
      return response(MESSAGE.UPDATE, HttpStatus.OK, { updated: true });
    } catch {
      return response(MESSAGE.UPDATE, HttpStatus.BAD_REQUEST, { updated: false });
    }
  }

  @MessagePattern(MESSAGE.DELETE)
  async delete(@Payload() data: { id: UUID }): PR {
    try {
      await this.fish.delete(data);
      return response(MESSAGE.UPDATE, HttpStatus.OK, { deleted: true });
    } catch {
      return response(MESSAGE.UPDATE, HttpStatus.BAD_REQUEST, { deleted: false });
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */
}
