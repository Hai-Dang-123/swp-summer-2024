import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomService } from './chatRoom.service';
import { ChatRoomController } from './chatRoom.controller';
import { ChatRoomEntity } from 'src/entities/chatRoom.entity';
import { AccountEntity } from 'src/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoomEntity]),
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [ChatRoomService],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
