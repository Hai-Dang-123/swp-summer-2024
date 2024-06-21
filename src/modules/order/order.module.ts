import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AccountEntity } from 'src/entities/account.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
