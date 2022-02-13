import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from 'src/config/config.service';
import { CLIENTS } from 'src/data/clients';

export const TokenProvider: Provider = {
  provide: CLIENTS.TOKEN,
  useFactory: (configService: ConfigService) => {
    const rabbit = configService.get('rabbit');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbit.host],
        queue: rabbit.queues.token,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
