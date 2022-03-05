import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import { GatewayModule } from './gateway.module';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = new ConfigService();

  AWS.config.update({
    accessKeyId: configService.get('aws').key.access,
    secretAccessKey: configService.get('aws').key.secret,
    region: configService.get('aws').region,
  });

  await app.listen(Number(process.env.GATEWAY_PORT) || 7000);
}

bootstrap();
