import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { FinanceJournalsService } from './fj.service';
import { StoreId } from 'src/decorator/storeId.decorator';
import { JournalEntryDto } from './fj.dto';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/finance/journals')
export class FinanceJournalsController {
  constructor(private readonly service: FinanceJournalsService) {}

  @Get()
  async getJournals(@StoreId() storeId: string) {
    const data = await this.service.getJournals(storeId);
    return data;
  }

  @Post()
  async createNewJournal(
    @StoreId() storeId: string,
    @Body() body: JournalEntryDto,
    @User() user: UserJwtPayload,
  ) {
    await this.service.createNewJournalService(storeId, body, user.sub);
    return { success: true };
  }

  @Get(':id')
  async getJournalByID(@StoreId() storeId: string, @Param('id') id: string) {
    const data = await this.service.getJournalById(storeId, id);

    return data;
  }

  @Delete(':id')
  async deleteJournalByID(
    @StoreId() storeId: string,
    @Param('id') id: string,
    @User() user: UserJwtPayload,
  ) {
    const data = await this.service.deleteJournalService(storeId, id, user.sub);

    return data;
  }

  @Patch(':id')
  async updateJournalById(
    @StoreId() storeId: string,
    @Param('id') id: string,
    @Body() body: JournalEntryDto,
    @User() user: UserJwtPayload,
  ) {
    await this.service.updateJournalService(storeId, id, body, user.sub);
    return { success: true };
  }
}
