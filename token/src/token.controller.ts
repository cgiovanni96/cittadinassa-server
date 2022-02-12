import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenService } from './token.service';

import T from 'src/messages/token.message';
import { PR } from 'lib/response/type';
import { response } from 'lib/response';

@Controller()
export class TokenController {
  constructor(private readonly token: TokenService) {}

  @MessagePattern('hello_token')
  tokenHello(): string {
    return 'Hello from Token';
  }

  @MessagePattern(T.CREATE)
  async createToken(@Payload() data: { userId: string }): PR {
    try {
      const createResult = await this.token.createToken(data.userId);

      return response(T.CREATE, HttpStatus.OK, { token: createResult.token });
    } catch {
      return response(T.CREATE, HttpStatus.BAD_REQUEST, undefined);
    }
  }

  @MessagePattern(T.DECODE)
  async decodeToken(@Payload() data: { token: string }): PR {
    const tokenData = await this.token.decodeToken({
      token: data.token,
    });

    if (tokenData) return response(T.DECODE, HttpStatus.OK, { userId: tokenData.userId });
    return response(T.DECODE, HttpStatus.BAD_REQUEST, undefined);
  }

  @MessagePattern(T.DESTROY)
  public async destroyToken(data: { userId: string }): PR {
    try {
      await this.token.deleteTokenForUserId(data.userId);
      return response(T.DESTROY, HttpStatus.OK, { destroyed: true });
    } catch {
      return response(T.DESTROY, HttpStatus.INTERNAL_SERVER_ERROR, { destroyed: false });
    }
  }
}
