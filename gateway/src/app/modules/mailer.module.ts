import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { MailerClient } from '../clients/mailer.client';
import { MailerProvider } from '../providers/mailer.provider';

@Module({
  imports: [],
  providers: [ConfigService, MailerProvider, MailerClient],
  exports: [MailerProvider, MailerClient],
})
export class MailerModule {}
