import { ConfigService } from 'src/config/config.service';
import { Module } from '@nestjs/common';
import { MailerModule } from './mailer.module';
import { UserRoute } from 'src/routes/user.route';
import { UserClient } from 'src/app/clients/user.client';
import { UserProvider } from '../providers/user.provider';
import { TokenProvider } from '../providers/token.provider';
import { TokenClient } from '../clients/token.client';

@Module({
  imports: [MailerModule],
  controllers: [UserRoute],
  providers: [ConfigService, UserProvider, UserClient, TokenProvider, TokenClient],
  exports: [UserProvider, UserClient],
})
export class UserModule {}
