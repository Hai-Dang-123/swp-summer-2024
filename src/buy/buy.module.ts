import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';

@Module({
  providers: [BuyService],
  controllers: [BuyController]
})
export class BuyModule {}
