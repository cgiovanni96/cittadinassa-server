import { Body, Controller, HttpStatus, Post, Req, Get } from '@nestjs/common';
import { TokenClient } from 'src/app/clients/token.client';
import { UserClient } from 'src/app/clients/user.client';

import { Dto } from 'src/model/user';

@Controller('auth')
export class AuthRoute {
  constructor(private readonly user: UserClient, private readonly token: TokenClient) {}

  @Post('/login')
  async loginUser(@Body() data: Dto.Login) {
    const getUserResponse = await this.user.getByCredentials(data);

    if (getUserResponse.status >= 400)
      return {
        status: getUserResponse.status,
        message: 'login_user_error',
        data: null,
      };

    const createTokenResponse = await this.token.create({
      userId: getUserResponse.data.user.id,
    });

    return {
      status: createTokenResponse.status,
      message: createTokenResponse.status < 400 ? 'login_success' : 'login_failure',
      data: createTokenResponse.data,
    };
  }

  @Post('/logout')
  async logoutUser(@Body() data: Dto.Get) {
    const getUserResponse = await this.user.get(data);

    if (getUserResponse.status >= 400)
      return {
        message: 'logout_user_error',
        status: getUserResponse.status,
        data: { destroyed: false },
      };

    const destroyTokenResponse = await this.token.destroy({
      userId: getUserResponse.data.user.id,
    });

    return {
      status: destroyTokenResponse.status,
      message: destroyTokenResponse.status < 400 ? 'logout_user_success' : 'logout_user_failure',
      data: destroyTokenResponse.data,
    };
  }

  @Get('/current')
  async current(@Req() req: any) {
    if (req.user)
      return {
        status: HttpStatus.OK,
        message: 'user_current',
        data: { user: req.user },
      };

    return {
      HttpStatus: HttpStatus.UNAUTHORIZED,
      message: 'user_not_current',
      data: undefined,
    };
  }
}
