import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { GLOBAL_ROLES } from 'src/model/global/type';
import { User } from 'src/model/user/user.model';
import { USER_ACTIONS } from './user.ability';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[USER_ACTIONS, Subjects]>;

@Injectable()
export class UserAbility {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[string, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.profile.globalRole === GLOBAL_ROLES.ADMIN) {
      can(USER_ACTIONS.MANAGE, 'all'); // read-write access to everything
    } else {
      can(USER_ACTIONS.READ, 'all'); // read-only access to everything
      can(USER_ACTIONS.UPDATE, User, { id: user.id });
      can(USER_ACTIONS.DELETE, User, { id: user.id });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
