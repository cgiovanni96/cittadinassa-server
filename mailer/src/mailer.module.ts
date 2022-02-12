import { MailerModule as NestMailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { Config } from './config/config';
import { MailerConfig } from './config/mailer';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
  ],
  controllers: [MailerController],
  providers: [Config],
})
export class MailerModule {}
