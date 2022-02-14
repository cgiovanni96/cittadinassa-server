import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenClient } from '../clients/token.client';
import { UserClient } from '../clients/user.client';

export const Authenticated = (auth: boolean = true) => SetMetadata('auth', auth);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly token: TokenClient,
    private readonly user: UserClient,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const auth = this.reflector.get<string[]>('auth', context.getHandler());

    if (!auth) return true;

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await this.token.decode({
      token: request.headers.authorization,
    });

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: undefined,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await this.user.get({ id: userTokenInfo.data.userId });

    request.user = userInfo.data.user;
    return true;
  }
}
