import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { AuthRoute } from 'src/routes/auth.route';
import { TokenClient } from '../clients/token.client';
import { TokenProvider } from '../providers/token.provider';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthRoute],
  providers: [ConfigService, TokenProvider, TokenClient],
  exports: [],
})
export class AuthModule {}
