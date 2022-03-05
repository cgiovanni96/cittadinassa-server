import { CanActivate } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from 'src/model/user/user.model';
import { UserAbility } from '../auth/user/user.auth';
import { Request } from 'express';
import { USER_ACTIONS } from '../auth/user/user.ability';
import { Models } from '../auth/models.auth';
import { GLOBAL_ROLES } from 'src/model/global/type';
import { FishClient } from '../clients/fish.client';
import { ROLES } from 'src/model/fish/fish.type';

type ProtectedInfo = {
  model: Models;
  action: string;
};

export const Protected = (info: ProtectedInfo) => SetMetadata('protected', info);

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userAbility: UserAbility,
    private readonly fish: FishClient,
  ) {}

  protectUserAction(data: { user: User; action: string; body: { id: string } }): boolean {
    if (data.user.profile.globalRole === GLOBAL_ROLES.ADMIN) return true;

    const ability = this.userAbility.createForUser(data.user);

    if (data.action === USER_ACTIONS.DELETE || data.action === USER_ACTIONS.UPDATE) {
      const user = new User();
      user.id = data.body.id;
      if (ability.can(data.action, user)) return true;
    }

    return ability.can(data.action, 'all');
  }

  async protectFishAction(data: {
    user: User;
    action: string;
    body: { id: string };
  }): Promise<boolean> {
    if (
      data.user.profile.globalRole === GLOBAL_ROLES.ADMIN ||
      data.user.profile.globalRole === GLOBAL_ROLES.OPERATION
    )
      return true;

    const ability = this.userAbility.createForFish(data.user);
    if (data.action === USER_ACTIONS.READ) return ability.can(data.action, 'all');

    const { data: fishData } = await this.fish.get({ id: data.body.id });
    if (!fishData) return false;
    const adminRole = fishData.fish.roles.find((role) => role.role.type === ROLES.ADMIN);

    return ability.can(data.action, adminRole);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const info: ProtectedInfo = this.reflector.get('protected', context.getHandler());

    if (!info || !info.action) return true;
    if (!req.user) return false;

    if (info.model === Models.USER)
      return this.protectUserAction({ user: req.user, action: info.action, body: req.body });

    if (info.model === Models.FISH)
      return this.protectFishAction({ user: req.user, action: info.action, body: req.body });
  }
}
