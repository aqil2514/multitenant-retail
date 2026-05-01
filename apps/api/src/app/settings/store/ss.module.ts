import { Module } from '@nestjs/common';
import { StoreSettingsController } from './ss.controller';
import { StoreSettingsService } from './ss.service';

@Module({
  controllers: [StoreSettingsController],
  providers: [StoreSettingsService],
})
export class SettingsStoreModule {}
