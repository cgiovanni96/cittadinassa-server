import { Module } from '@nestjs/common';
import { GUARDS } from './app/guards';

// imports
import { AuthModule } from './app/modules/auth.module';
import { AuthorizationModule } from './app/modules/authorization.module';
import { MailerModule } from './app/modules/mailer.module';
import { UserModule } from './app/modules/user.module';
//providers
import { ConfigService } from './config/config.service';

@Module({
  imports: [UserModule, AuthModule, MailerModule, AuthorizationModule, GUARDS],
  controllers: [],
  providers: [ConfigService],
})
export class GatewayModule {}
