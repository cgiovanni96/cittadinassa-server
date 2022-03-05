import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CLIENTS } from 'src/data/clients';

import { COMMANDS, Response, Dto } from 'src/model/user';

@Injectable()
export class UserClient {
  constructor(@Inject(CLIENTS.USER) private readonly client: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async getAll(): Promise<Response.FoundAll> {
    return firstValueFrom(this.client.send(COMMANDS.GETALL, {}));
  }

  async get(data: Dto.Get): Promise<Response.Found> {
    return firstValueFrom(this.client.send(COMMANDS.GET, data));
  }

  async create(data: Dto.Create): Promise<Response.Created> {
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

  async getByCredentials(data: Dto.Login): Promise<Response.Found> {
    return firstValueFrom(this.client.send(COMMANDS.SEARCH_BY_CREDENTIALS, data));
  }

  async confirm(data: Dto.Confirm): Promise<Response.Confirmed> {
    return firstValueFrom(this.client.send(COMMANDS.CONFIRM_LINK, data));
  }

  //   async userForgotPassword(data: Dto.ForgotPassword): Promise<Responses.ForgotPassword> {
  //     return firstValueFrom(
  //       this.userClient.send<Responses.ForgotPassword, Dto.ForgotPassword>(
  //         COMMANDS.USER_FORGOT_PASSWORD,
  //         data,
  //       ),
  //     );
  //   }

  //   async userChangePassword(data: Dto.ChangePassword): Promise<Responses.ChangePassword> {
  //     return firstValueFrom(
  //       this.userClient.send<Responses.ChangePassword, Dto.ChangePassword>(
  //         COMMANDS.USER_CHANGE_PASSWORD,
  //         data,
  //       ),
  //     );
  //   }

  //   async userIsAdmin(data: { id: string }): Promise<Responses.IsAdmin> {
  //     return firstValueFrom(
  //       this.userClient.send<Responses.IsAdmin, { id: string }>(COMMANDS.USER_IS_ADMIN, data),
  //     );
  //   }
}
