import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LinkService } from 'src/services/link.service';
import { UserService } from 'src/services/user.service';

import L from 'src/messages/link.message';
import { PR } from 'src/lib/response/type';
import { response } from 'src/lib/response';
import { UUID } from 'src/types/base.types';
import { hash } from 'bcrypt';

@Controller()
export class LinkController {
  constructor(private readonly link: LinkService, private readonly user: UserService) {}

  @MessagePattern(L.CONFIRM_LINK)
  async confirmUser(data: { link: string }): PR {
    try {
      const userLink = await this.link.find({ conditions: { link: data.link } });

      await this.link.update({ conditions: { id: userLink.id }, data: { link: userLink.link } });
      await this.user.confirm({ id: userLink.userId });

      return response(L.CONFIRM_LINK, HttpStatus.OK, { confirmed: true });
    } catch {
      return response(L.CONFIRM_LINK, HttpStatus.BAD_REQUEST, { confirmed: false });
    }
  }

  @MessagePattern(L.CHANGE_PASSWORD)
  public async changePassword(data: { id: UUID; password: string; link: string }): PR {
    try {
      const user = await this.user.get({ id: data.id, relations: 'auth' });

      const newPassword = await hash(data.password, 12);

      await this.user.update({
        conditions: { id: user.id },
        data: { authInfo: { ...user.authInfo, changingPassword: false, password: newPassword } },
      });

      await this.link.update({ conditions: { link: data.link }, data: { isUsed: true } });
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { changed: false },
      };
    }
  }
}
