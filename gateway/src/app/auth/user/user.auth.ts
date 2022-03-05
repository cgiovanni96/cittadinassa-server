import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { GLOBAL_ROLES } from 'src/model/global/type';
import { Fish, FishToRole } from 'src/model/fish/fish.model';
import { User } from 'src/model/user/user.model';
import { USER_ACTIONS } from './user.ability';

type UserSubject = InferSubjects<typeof User> | 'all';
type FishSubject = InferSubjects<typeof Fish | typeof FishToRole> | 'all';

export type AppUserAbility = Ability<[USER_ACTIONS, UserSubject]>;
export type AppFishAbility = Ability<[USER_ACTIONS, FishSubject]>;

@Injectable()
export class UserAbility {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[string, UserSubject]>>(
      Ability as AbilityClass<AppUserAbility>,
    );

    if (user.profile.globalRole === GLOBAL_ROLES.ADMIN) {
      can(USER_ACTIONS.MANAGE, 'all'); // read-write access to everything
    } else {
      can(USER_ACTIONS.READ, 'all'); // read-only access to everything
      can(USER_ACTIONS.UPDATE, User, { id: user.id });
      can(USER_ACTIONS.DELETE, User, { id: user.id });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<UserSubject>,
    });
  }

  createForFish(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[string, FishSubject]>>(
      Ability as AbilityClass<AppFishAbility>,
    );

    const globalRole = user.profile.globalRole;

    if (globalRole === GLOBAL_ROLES.ADMIN || globalRole === GLOBAL_ROLES.OPERATION) {
      can(USER_ACTIONS.MANAGE, 'all'); // read-write access to everything
    } else {
      can(USER_ACTIONS.READ, 'all'); // read-only access to everything
      can(USER_ACTIONS.UPDATE, FishToRole, { userIds: { $in: [user.id] } });
      can(USER_ACTIONS.DELETE, FishToRole, { userIds: { $in: [user.id] } });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<FishSubject>,
    });
  }
}
