import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { getActivityLogForTable } from 'src/helpers/db/activity-log/get-log';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivityLog(storeId: string, pagination: PaginationQueryDto) {
    const { limit, page } = pagination;
    return await getActivityLogForTable(this.prisma, storeId, page, limit);
  }
}
