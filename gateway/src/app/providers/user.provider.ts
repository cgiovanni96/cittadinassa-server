import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CLIENTS } from 'src/data/clients';

import { ConfigService } from 'src/config/config.service';

export const UserProvider: Provider = {
  provide: CLIENTS.USER,
  useFactory: (configService: ConfigService) => {
    const rabbit = configService.get('rabbit');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbit.host],
        queue: rabbit.queues.user,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
