import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../modules/auth.module';
import { AuthorizationModule } from '../modules/authorization.module';
import { FishModule } from '../modules/fish.module';
import { UserModule } from '../modules/user.module';
import { AuthGuard } from './authentication.guard';
import { AuthorizationGuard } from './authorization.guard';

@Module({
  imports: [UserModule, AuthModule, AuthorizationModule, FishModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class GUARDS {}
