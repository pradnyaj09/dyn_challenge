import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExternalAuthService } from '../external-auth/external-auth.service';
import { ConfigModule } from '@nestjs/config';
import { ExternalAuthConfig } from '../external-auth/externalAuth.config';

@Module({
  imports:[ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, ExternalAuthService, ExternalAuthConfig]
})
export class AuthModule {}
