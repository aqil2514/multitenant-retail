import { Module } from '@nestjs/common';
import { ActivityLogService } from './al.service';
import { ActivityLogController } from './al.controller';

@Module({
  providers: [ActivityLogService],
  controllers: [ActivityLogController],
})
export class ActivityLogModule {}
