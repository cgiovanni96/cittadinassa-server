import { Module } from '@nestjs/common';

// imports
import { AuthModule } from './app/modules/auth.module';
import { MailerModule } from './app/modules/mailer.module';
import { UserModule } from './app/modules/user.module';
//providers
import { ConfigService } from './config/config.service';

@Module({
  imports: [UserModule, AuthModule, MailerModule],
  controllers: [],
  providers: [ConfigService],
})
export class GatewayModule {}
