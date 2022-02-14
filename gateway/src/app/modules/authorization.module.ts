import { Module } from '@nestjs/common';
import { UserAbility } from '../auth/user/user.auth';

@Module({
  providers: [UserAbility],
  exports: [UserAbility],
})
export class AuthorizationModule {}
