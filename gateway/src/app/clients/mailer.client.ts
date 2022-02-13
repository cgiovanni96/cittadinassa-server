import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CLIENTS } from 'src/data/clients';

import { COMMANDS, Dto, Response } from 'src/model/mailer';

@Injectable()
export class MailerClient {
  constructor(@Inject(CLIENTS.MAILER) private readonly client: ClientProxy) {}

  async send(data: Dto.Send): Promise<Response.Sent> {
    return firstValueFrom(this.client.send(COMMANDS.SEND, data));
  }
}
