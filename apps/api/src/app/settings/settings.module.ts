import { Module } from '@nestjs/common';
import { SettingsStoreModule } from './store/ss.module';

@Module({
  imports: [SettingsStoreModule],
})
export class SettingsModule {}
