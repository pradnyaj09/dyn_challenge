import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExternalAuthService } from './external-auth/external-auth.service';
import { ExternalAuthConfig } from './external-auth/externalAuth.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, ExternalAuthService, ExternalAuthConfig],
})
export class AppModule {}
