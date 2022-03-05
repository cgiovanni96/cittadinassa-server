import { Module } from '@nestjs/common';

import { ConfigService } from 'src/config/config.service';

import { FishRoute } from 'src/routes/fish.route';
import { FishClient } from 'src/app/clients/fish.client';
import { FishProvider } from '../providers/fish.provider';

@Module({
  imports: [],
  controllers: [FishRoute],
  providers: [ConfigService, FishProvider, FishClient],
  exports: [FishProvider, FishClient],
})
export class FishModule {}
