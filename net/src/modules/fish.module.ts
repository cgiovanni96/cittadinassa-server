import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Fish } from 'src/entities/fish/fish.entity';
import { Role } from 'src/entities/role.entity';
import { ExtraInfo } from 'src/entities/fish/extra.fish';

@Module({
  imports: [],
})
export class FishModule {}
