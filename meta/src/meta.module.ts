import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { DbModule } from './config/db.service';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [ConfigService],
})
export class MetaModule {}
