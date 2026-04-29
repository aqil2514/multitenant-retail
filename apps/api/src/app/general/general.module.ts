import { Module } from '@nestjs/common';
import { ActivityLogModule } from './activity-log/al.module';

@Module({
  imports: [ActivityLogModule],
})
export class GeneralModule {}
