import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OnBoardingModule } from './onboarding/onboarding.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';
import { GeneralModule } from './general/general.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
    EventEmitterModule.forRoot(),

    PrismaModule,

    GeneralModule,
    ProductModule,
    SettingsModule,

    AuthModule,
    OnBoardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
