/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

export const UserRelations = {
  auth: ['authInfo'],
  profile: ['profile'],
  all: ['profile', 'authInfo'],
  none: [],
};

export type UserRelationsKeys = keyof typeof UserRelations;
