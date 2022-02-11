import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Number(process.env.GATEWAY_PORT) || 7000);
}

bootstrap();
