import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OnBoardingModule } from './onboarding/onboarding.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),

    PrismaModule,

    AuthModule,
    OnBoardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
