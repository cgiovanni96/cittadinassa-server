import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { NetModule } from './net.module';
// import getAmqUrl from './lib/utils/getAmqUrl';
import { ConfigService, RabbitConf } from './config/config';

async function bootstrap() {
  const rabbit = new ConfigService().get<RabbitConf>('rabbit');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NetModule, {
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
