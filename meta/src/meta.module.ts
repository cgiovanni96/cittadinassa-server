import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { DbModule } from './config/db.service';
import { AuthController } from './controllers/auth.controller';
import { LinkController } from './controllers/link.controller';
import { UserController } from './controllers/user.controller';
import { Link } from './entities/link.entity';
import { Auth } from './entities/user/auth.entity';
import { Profile } from './entities/user/profile.entity';
import { User } from './entities/user/user.entity';
import { LinkService } from './services/link.service';
import { UserService } from './services/user.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([User, Profile, Auth, Link])],
  controllers: [UserController, LinkController, AuthController],
  providers: [ConfigService, UserService, LinkService],
})
export class MetaModule {}
