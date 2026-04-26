import { Module } from '@nestjs/common';
import { OnBoardingController } from './controllers/onboarding.controller';
import { OnboardingListener } from './services/onboarding.listener';
import { OnBoardingService } from './services/onboarding.service';

@Module({
  controllers: [OnBoardingController],
  providers: [OnboardingListener, OnBoardingService],
})
export class OnBoardingModule {}
