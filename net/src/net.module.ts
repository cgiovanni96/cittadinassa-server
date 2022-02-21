import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './config/db';
import { Event } from './entities/fish/children/event.fish';
import { Group } from './entities/fish/children/group.fish';
import { Project } from './entities/fish/children/project.fish';
import { Fish } from './entities/fish/fish.entity';
import { Role } from './entities/fish/role.entity';
import { FishModule } from './modules/fish.module';
import { EventService } from './services/event.service';
import { FishService } from './services/fish.service';
import { GroupService } from './services/group.service';
import { ProjectService } from './services/project.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Fish, Role, Event, Project, Group]), FishModule],
  controllers: [],
  providers: [FishService, EventService, GroupService, ProjectService],
})
export class NetModule {}
