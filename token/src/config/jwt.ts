import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfig implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: process.env.SECRET,
    };
  }
}
