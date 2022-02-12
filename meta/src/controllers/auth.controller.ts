import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { response } from 'src/lib/response';
import { PR } from 'src/lib/response/type';

import { LinkService } from 'src/services/link.service';
import { UserService } from 'src/services/user.service';
import { UUID } from 'src/types/base.types';
import { LINKTYPES } from 'src/types/link.types';

import U from 'src/messages/user.message';

@Controller()
export class AuthController {
  constructor(private readonly link: LinkService, private readonly user: UserService) {}

  @MessagePattern(U.FORGOT_PASSWORD)
  public async forgotPassword(@Payload() data: { userId: UUID }): PR {
    try {
      const user = await this.user.get({ id: data.userId, relations: 'auth' });

      const passwordLink = await this.link.create({
        userId: user.id,
        type: LINKTYPES.PASSWORD,
      });

      const httpLink = await this.link.generateHttpLink({ link: passwordLink.link });

      await this.user.update({
        conditions: { id: user.id },
        data: { authInfo: { ...user.authInfo, changingPassword: true } },
      });

      return response(U.FORGOT_PASSWORD, HttpStatus.OK, { link: httpLink });
    } catch {
      return response(U.FORGOT_PASSWORD, HttpStatus.BAD_REQUEST, undefined);
    }
  }
}
