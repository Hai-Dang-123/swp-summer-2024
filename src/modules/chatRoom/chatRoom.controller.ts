import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ChatRoomService } from './chatRoom.service';
import { AccountEntity } from 'src/entities/account.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('chat_room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  findAll() {
    return this.chatRoomService.findAll();
  }

  @Post()
  createChatRoom(
    @Body()
    chatRoom: {
      code: string;
      participant: UUID;
      productId: string;
    },
  ) {
    const result = this.chatRoomService.createChatRoom(chatRoom);
    return result
      ? result
      : {
          message: 'Failed to create new chat room',
        };
  }

  @Get('/room/:id')
  getChatRoomByRoom(@Param('id') code: string) {
    return this.chatRoomService.getChatRoomByRoom(code);
  }

  @Get('/user/:id')
  getChatRoomByParticipant(@Param('id') userId: string) {
    return this.chatRoomService.getChatRoomByParticipant(userId);
  }

  @Get('/:id')
  getChatRoomById(@Param('id') id: string) {
    return this.chatRoomService.findOne(id);
  }

  @Patch(':id')
  updateChatRoom(
    @Param('id') id: string,
    @Body()
    update: {
      code: string;
      participants: AccountEntity[];
      productId: string;
    },
  ) {
    return this.chatRoomService.updateChatRoom(id, update);
  }
}
