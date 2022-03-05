import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CLIENTS } from 'src/data/clients';

import { COMMANDS, Response, Dto } from 'src/model/fish';
import { CreateFishDto } from 'src/model/fish/fish.dto';

@Injectable()
export class FishClient {
  constructor(@Inject(CLIENTS.FISH) private readonly client: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async getAll(): Promise<Response.FoundAll> {
    return firstValueFrom(this.client.send(COMMANDS.GET_ALL, {}));
  }

  async get(data: Dto.Get): Promise<Response.Found> {
    return firstValueFrom(this.client.send(COMMANDS.GET, data));
  }

  async create(data: CreateFishDto): Promise<Response.Created> {
    return firstValueFrom(this.client.send(COMMANDS.CREATE, data));
  }

  async delete(data: Dto.Delete): Promise<Response.Deleted> {
    return firstValueFrom(this.client.send(COMMANDS.DELETE, data));
  }

  async update(data: Dto.Update): Promise<Response.Updated> {
    return firstValueFrom(this.client.send(COMMANDS.UPDATE, data));
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async uploadCover(data: Dto.UploadCoverDto) {
    return firstValueFrom(this.client.send(COMMANDS.UPLOAD, data));
  }
}
