import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { StoreId } from 'src/decorator/storeId.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { ActivityLogService } from './al.service';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/audit-log')
export class ActivityLogController {
  constructor(private readonly service: ActivityLogService) {}
  @Get()
  async getAuditLog(
    @StoreId() storeId: string,
    @Query() query: PaginationQueryDto,
  ) {
    const data = await this.service.getActivityLog(storeId, query);
    return data;
  }
}
