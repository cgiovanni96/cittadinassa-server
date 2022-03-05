import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// CONFIG
import { DbModule } from './config/db';
// ENTITIES
import { FishRole } from './entities/fish/fishRole.entity';
import { Event } from './entities/fish/children/event.entity';
import { Group } from './entities/fish/children/group.entity';
import { Project } from './entities/fish/children/project.entity';
import { Fish } from './entities/fish/fish.entity';
import { Role } from './entities/role.entity';
// MODULES
import { FishModule } from './modules/fish.module';
import { EventService } from './services/event.service';
import { FishService } from './services/fish.service';
import { GroupService } from './services/group.service';
import { ProjectService } from './services/project.service';
import { FishController } from './controllers/fish.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([Fish, Role, Event, Project, FishRole, Group]),
    FishModule,
  ],
  controllers: [FishController],
  providers: [FishService, EventService, GroupService, ProjectService, RoleService],
})
export class NetModule {}
