import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CLIENTS } from 'src/data/clients';

import { COMMANDS, Dto, Response } from 'src/model/token';

@Injectable()
export class TokenClient {
  constructor(@Inject(CLIENTS.TOKEN) private readonly tokenClient: ClientProxy) {}

  async create(data: Dto.Create): Promise<Response.Created> {
    return firstValueFrom(this.tokenClient.send(COMMANDS.CREATE, data));
  }

  async destroy(data: Dto.Destroy): Promise<Response.Destroyed> {
    return firstValueFrom(this.tokenClient.send(COMMANDS.DESTROY, data));
  }

  async decode(data: Dto.Decode): Promise<Response.Decoded> {
    return firstValueFrom(this.tokenClient.send(COMMANDS.DECODE, data));
  }
}
