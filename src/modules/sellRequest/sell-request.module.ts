// sell-request.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellRequest } from 'src/entities/sell-request.entity';
import { SellRequestController } from './sell-request.controller';
import { SellRequestService } from './sell-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellRequest])],
  controllers: [SellRequestController],
  providers: [SellRequestService],
})
export class SellRequestModule {}
