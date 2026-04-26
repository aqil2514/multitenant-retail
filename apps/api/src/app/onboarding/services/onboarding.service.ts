import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { OnBoardingDto } from '../dto/onboarding.dto';

@Injectable()
export class OnBoardingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private async createNewStoreDb(userId: string, payload: OnBoardingDto) {
    return await this.prisma.store.create({
      data: {
        name: payload.name,
        address: payload.address,
        phone: payload.phone,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });
  }

  async createNewStoreService(userId: string, payload: OnBoardingDto) {
    const { id } = await this.createNewStoreDb(userId, payload);
    this.eventEmitter.emit('onboarding.created', id);

    return id;
  }
}
