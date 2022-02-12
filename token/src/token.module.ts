import { DbConfig } from './config/db';
import { JwtConfig } from './config/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),

    TypeOrmModule.forRootAsync({
      useClass: DbConfig,
    }),

    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
