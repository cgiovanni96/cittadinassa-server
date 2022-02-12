import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { MailerModule } from './mailer.module';
import { Config, RabbitConf } from './config/config';

async function bootstrap() {
  const rabbit = new Config().get<RabbitConf>('rabbit');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MailerModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbit.host],
      queue: rabbit.queue,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}
bootstrap();
