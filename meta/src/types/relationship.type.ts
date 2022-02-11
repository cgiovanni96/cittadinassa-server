/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

export const UserRelations = {
  auth: ['auth'],
  profile: ['profile'],
  all: ['profile', 'auth'],
  none: [],
};

export type UserRelationsKeys = keyof typeof UserRelations;
